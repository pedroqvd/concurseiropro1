import { WEBHOOKS } from "../config/webhooks";
import {
  Flashcard,
  getAllFlashcards as localGetAll,
  getFlashcardsForReview as localGetReview,
  getFlashcardById as localGetById,
  createFlashcard as localCreate,
  updateFlashcard as localUpdate,
  updateFlashcardFeedback as localUpdateFeedback,
  deleteFlashcard as localDelete,
} from "./storage";

// ─── Cache em memória (evita 429 no Make) ────────────────────────────────────
// Os dados ficam válidos por 60s. Qualquer escrita (create/update/delete)
// invalida o cache imediatamente para garantir consistência.
const CACHE_TTL_MS = 60_000;
let cache: { data: Flashcard[]; ts: number } | null = null;

function invalidateCache() {
  cache = null;
}

function isCacheValid() {
  return cache !== null && Date.now() - cache.ts < CACHE_TTL_MS;
}

// ─── Utilitário de POST ───────────────────────────────────────────────────────
async function post<T>(url: string, body: object): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok)
    throw new Error(`Webhook error: HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

// Normaliza dados vindos do Make (Google Sheets retorna tudo como string ou com pequenas variações)
function normalizeCard(raw: any): Flashcard {
  // Garante que o valor seja uma string sem espaços extras. Retorna string vazia se inválido/ausente.
  const safeString = (val: any) => {
    if (val === undefined || val === null) return "";
    return String(val).trim();
  };

  // Conversão segura do ID
  let safeId = 0;
  if (raw && raw.id !== undefined && raw.id !== null) {
    // Remove qualquer caractere que não seja número
    const cleanedId = String(raw.id).replace(/\D/g, "");
    const parsedId = Number(cleanedId);
    if (!isNaN(parsedId) && cleanedId !== "") {
      safeId = parsedId;
    }
  }
  
  // Se falhou em gerar ID ou veio vazio, gera um único para não quebrar a listagem (React keys)
  if (safeId === 0) {
     safeId = Date.now() + Math.floor(Math.random() * 100000);
  }

  const hoje = new Date().toISOString().split("T")[0];

  // Garante que o nível siga a capitalização correta exigida pelo frontend
  const nivelRaw = safeString(raw?.nivel).toLowerCase();
  let nivelFinal = "Novo";
  if (nivelRaw === "errei") nivelFinal = "Errei";
  if (nivelRaw === "bom") nivelFinal = "Bom";
  if (nivelRaw === "fácil" || nivelRaw === "facil") nivelFinal = "Fácil";

  return {
    id: safeId,
    disciplina: safeString(raw?.disciplina),
    pergunta: safeString(raw?.pergunta),
    resposta: safeString(raw?.resposta),
    nivel: nivelFinal as Flashcard["nivel"],
    proxima_revisao: safeString(raw?.proxima_revisao) || hoje,
    data_cadastro: safeString(raw?.data_cadastro) || hoje,
  };
}

// ─── READ ─────────────────────────────────────────────────────────────────────
export async function getAllFlashcards(): Promise<Flashcard[]> {
  if (!WEBHOOKS.MULTI) return localGetAll();

  if (isCacheValid()) return cache!.data;

  // 1. Pega os dados locais primeiro (fonte principal de todos os cards)
  const localCards = localGetAll();
  const localCardsMap = new Map(localCards.map((c) => [c.id, c]));

  try {
    const data = await post<any>(WEBHOOKS.MULTI, { action: "read" });
    
    if (Array.isArray(data)) {
      const deletedIds = JSON.parse(localStorage.getItem('concurseiro_pro_deleted') || '[]');
      
      const makeCards = data
        .map(normalizeCard)
        .filter((c) => c.disciplina !== "" || c.pergunta !== "")
        // PROTEÇÃO ZUMBI: Se deletamos localmente, ignora o Make caso ele falhe em deletar
        .filter((c) => !deletedIds.includes(c.id));
        
      // 3. Atualiza os dados locais com o que veio do Make
      makeCards.forEach((mc) => {
        const local = localCardsMap.get(mc.id);
        
        if (local) {
          // HEURÍSTICA DE PROTEÇÃO: 
          // Se o Make retornar uma data de revisão menor (mais antiga) que a nossa local,
          // ou se o Make disser que o card é "Novo" mas nós já revisamos localmente,
          // significa que o Make falhou no update ou está atrasado. Confiamos no local!
          const makeIsBehind = 
            mc.proxima_revisao < local.proxima_revisao ||
            (mc.nivel === "Novo" && local.nivel !== "Novo");
            
          if (makeIsBehind) {
            return; // Ignora a versão desatualizada do Make
          }
        }
        
        localCardsMap.set(mc.id, mc);
      });
      
      const finalCards = Array.from(localCardsMap.values());
      localStorage.setItem("concurseiro_pro_flashcards", JSON.stringify(finalCards));
      
      cache = { data: finalCards, ts: Date.now() };
      return finalCards;
    }

    cache = { data: localCards, ts: Date.now() };
    return localCards;
  } catch (error) {
    console.warn("Make falhou ou atrasou, usando dados locais", error);
    return localCards;
  }
}

export async function getFlashcardsForReview(): Promise<Flashcard[]> {
  const cards = await getAllFlashcards();
  const today = new Date().toISOString().split("T")[0];
  return cards.filter((card) => card.proxima_revisao <= today);
}

export async function getFlashcardById(id: number): Promise<Flashcard | undefined> {
  const cards = await getAllFlashcards();
  return cards.find((c) => c.id === id);
}

// ─── CREATE ───────────────────────────────────────────────────────────────────
export async function createFlashcard(
  data: Pick<Flashcard, "disciplina" | "pergunta" | "resposta">,
): Promise<Flashcard> {
  // Cria localmente PRIMEIRO para garantir que o site atualize imediatamente
  const localCard = localCreate(data);

  if (!WEBHOOKS.CREATE) return localCard;

  try {
    const raw = await post<any>(WEBHOOKS.CREATE, data);
    invalidateCache();
    
    // Se o Make retornar o ID verdadeiro gerado pelo Sheets, atualiza o card local
    if (raw && raw.id) {
       // Mescla os dados originais com o que o Make retornou (para não perder o texto se o Make mandar só o ID)
       const updatedFromMake = normalizeCard({
         ...data,
         ...raw,
       });
       // Troca o ID provisório pelo ID do Sheets
       const cards = localGetAll();
       const filtered = cards.filter(c => c.id !== localCard.id);
       filtered.push(updatedFromMake);
       localStorage.setItem("concurseiro_pro_flashcards", JSON.stringify(filtered));
       return updatedFromMake;
    }

    return localCard;
  } catch (err) {
    console.warn("Make error on create, but saved locally.", err);
    return localCard;
  }
}

// ─── UPDATE (conteúdo do card) ────────────────────────────────────────────────
export async function updateFlashcard(
  id: number,
  data: Pick<Flashcard, "disciplina" | "pergunta" | "resposta">,
): Promise<void> {
  // Atualiza no site imediatamente
  localUpdate(id, data);
  if (!WEBHOOKS.MULTI) return;

  try {
    // Sincroniza com o Make em background
    await post(WEBHOOKS.MULTI, { action: "update", id, ...data });
    invalidateCache();
  } catch (err) {
    console.warn("Make error on update, but saved locally.", err);
  }
}

// ─── UPDATE (feedback de revisão — dispara o algoritmo de espaçamento) ────────
export async function updateFlashcardFeedback(
  id: number,
  feedback: "Errei" | "Bom" | "Fácil",
): Promise<void> {
  // Atualiza no site imediatamente
  localUpdateFeedback(id, feedback);
  if (!WEBHOOKS.MULTI) return;

  try {
    // Sincroniza com o Make em background
    await post(WEBHOOKS.MULTI, { action: "update", id, feedback });
    invalidateCache();
  } catch (err) {
    console.warn("Make error on update feedback, but saved locally.", err);
  }
}

// ─── DELETE ───────────────────────────────────────────────────────────────────
export async function deleteFlashcard(id: number): Promise<void> {
  // Deleta do site imediatamente
  localDelete(id);
  if (!WEBHOOKS.MULTI) return;

  try {
    // Deleta do Make em background
    await post(WEBHOOKS.MULTI, { action: "delete", id });
    invalidateCache();
  } catch (err) {
    console.warn("Make error on delete, but deleted locally.", err);
  }
}