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

  // Retorna do cache se ainda válido — evita 429
  if (isCacheValid()) return cache!.data;

  try {
    const data = await post<Record<string, string>[]>(
      WEBHOOKS.MULTI,
      { action: "read" },
    );
    const cards = Array.isArray(data)
      ? data.map(normalizeCard)
      : localGetAll();
    cache = { data: cards, ts: Date.now() };
    return cards;
  } catch {
    return localGetAll();
  }
}

export async function getFlashcardsForReview(): Promise<
  Flashcard[]
> {
  const cards = await getAllFlashcards();
  const today = new Date().toISOString().split("T")[0];
  return cards.filter((card) => card.proxima_revisao <= today);
}

export async function getFlashcardById(
  id: number,
): Promise<Flashcard | undefined> {
  const cards = await getAllFlashcards();
  return cards.find((c) => c.id === id);
}

// ─── CREATE ───────────────────────────────────────────────────────────────────
export async function createFlashcard(
  data: Pick<Flashcard, "disciplina" | "pergunta" | "resposta">,
): Promise<Flashcard> {
  if (!WEBHOOKS.CREATE) return localCreate(data);
  try {
    const raw = await post<any>(
      WEBHOOKS.CREATE,
      data,
    );
    invalidateCache();
    
    // Se o Make retornar apenas algo genérico como { success: true } ou { Accepted: true } sem os dados do card
    if (raw && !raw.disciplina && !raw.pergunta) {
       return normalizeCard({
         ...data,
         id: raw.id || (Date.now() + Math.floor(Math.random() * 100000)),
         nivel: "Novo",
       });
    }

    return normalizeCard(raw);
  } catch {
    return localCreate(data);
  }
}

// ─── UPDATE (conteúdo do card) ────────────────────────────────────────────────
export async function updateFlashcard(
  id: number,
  data: Pick<Flashcard, "disciplina" | "pergunta" | "resposta">,
): Promise<void> {
  if (!WEBHOOKS.MULTI) {
    localUpdate(id, data);
    return;
  }
  try {
    await post(WEBHOOKS.MULTI, {
      action: "update",
      id,
      ...data,
    });
    invalidateCache();
  } catch {
    localUpdate(id, data);
  }
}

// ─── UPDATE (feedback de revisão — dispara o algoritmo de espaçamento) ────────
export async function updateFlashcardFeedback(
  id: number,
  feedback: "Errei" | "Bom" | "Fácil",
): Promise<void> {
  if (!WEBHOOKS.MULTI) {
    localUpdateFeedback(id, feedback);
    return;
  }
  try {
    await post(WEBHOOKS.MULTI, {
      action: "update",
      id,
      feedback,
    });
    invalidateCache();
  } catch {
    localUpdateFeedback(id, feedback);
  }
}

// ─── DELETE ───────────────────────────────────────────────────────────────────
export async function deleteFlashcard(
  id: number,
): Promise<void> {
  if (!WEBHOOKS.MULTI) {
    localDelete(id);
    return;
  }
  try {
    await post(WEBHOOKS.MULTI, { action: "delete", id });
    invalidateCache();
  } catch {
    localDelete(id);
  }
}