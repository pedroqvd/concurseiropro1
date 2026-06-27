export interface Flashcard {
  id: number;
  disciplina: string;
  pergunta: string;
  resposta: string;
  nivel: 'Novo' | 'Errei' | 'Bom' | 'Fácil';
  proxima_revisao: string; // ISO date string
  data_cadastro: string; // ISO date string
}

const STORAGE_KEY = 'concurseiro_pro_flashcards';

// Initialize with sample data if empty
const initializeStorage = (): Flashcard[] => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) {
    return JSON.parse(existing);
  }
  
  const today = new Date().toISOString().split('T')[0];
  const sampleData: Flashcard[] = [
    {
      id: 1,
      disciplina: 'Direito Administrativo',
      pergunta: 'Quais são os princípios da Administração Pública previstos na CF/88?',
      resposta: 'LIMPE: Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência.',
      nivel: 'Novo',
      proxima_revisao: today,
      data_cadastro: today,
    },
    {
      id: 2,
      disciplina: 'AFO (Administração Financeira e Orçamentária)',
      pergunta: 'O que é o princípio da anualidade orçamentária?',
      resposta: 'Determina que o orçamento deve ser autorizado para um período determinado, geralmente um ano (exercício financeiro).',
      nivel: 'Novo',
      proxima_revisao: today,
      data_cadastro: today,
    },
    {
      id: 3,
      disciplina: 'Português',
      pergunta: 'Qual a diferença entre "há" e "a" indicando tempo?',
      resposta: '"Há" indica tempo passado (há 2 dias = faz 2 dias). "A" indica tempo futuro (daqui a 2 dias).',
      nivel: 'Novo',
      proxima_revisao: today,
      data_cadastro: today,
    },
  ];
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
  return sampleData;
};

export const getAllFlashcards = (): Flashcard[] => {
  const cards = initializeStorage();
  // Limpa possíveis cards fantasmas que já ficaram presos no cache/localStorage
  return cards.filter(c => c.disciplina?.trim() !== '' || c.pergunta?.trim() !== '');
};

export const getFlashcardsForReview = (): Flashcard[] => {
  const cards = getAllFlashcards();
  const today = new Date().toISOString().split('T')[0];
  return cards.filter(card => card.proxima_revisao <= today);
};

export const getFlashcardById = (id: number): Flashcard | undefined => {
  const cards = getAllFlashcards();
  return cards.find(card => card.id === id);
};

export const createFlashcard = (data: Omit<Flashcard, 'id' | 'nivel' | 'proxima_revisao' | 'data_cadastro'>): Flashcard => {
  const cards = getAllFlashcards();
  const today = new Date().toISOString().split('T')[0];
  
  const newCard: Flashcard = {
    ...data,
    id: cards.length > 0 ? Math.max(...cards.map(c => c.id)) + 1 : 1,
    nivel: 'Novo',
    proxima_revisao: today,
    data_cadastro: today,
  };
  
  cards.push(newCard);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  return newCard;
};

export const updateFlashcard = (id: number, data: Partial<Flashcard>): void => {
  const cards = getAllFlashcards();
  const index = cards.findIndex(card => card.id === id);
  
  if (index !== -1) {
    cards[index] = { ...cards[index], ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }
};

export const updateFlashcardFeedback = (id: number, feedback: 'Errei' | 'Bom' | 'Fácil'): void => {
  const cards = getAllFlashcards();
  const index = cards.findIndex(card => card.id === id);
  
  if (index !== -1) {
    const today = new Date();
    let daysToAdd = 1;
    
    if (feedback === 'Bom') daysToAdd = 3;
    if (feedback === 'Fácil') daysToAdd = 7;
    
    const nextDate = new Date(today);
    nextDate.setDate(nextDate.getDate() + daysToAdd);
    
    cards[index].nivel = feedback;
    cards[index].proxima_revisao = nextDate.toISOString().split('T')[0];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }
};

export const deleteFlashcard = (id: number): void => {
  const cards = getAllFlashcards();
  const filtered = cards.filter(card => card.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
