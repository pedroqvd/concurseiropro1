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

const initializeStorage = (): Flashcard[] => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) {
    return JSON.parse(existing);
  }
  
  const sampleData: Flashcard[] = [];
  
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
  
  // Salva o ID deletado para evitar que o Make o ressuscite se falhar no Delete a Row
  const deletedIds = JSON.parse(localStorage.getItem('concurseiro_pro_deleted') || '[]');
  if (!deletedIds.includes(id)) {
    deletedIds.push(id);
    localStorage.setItem('concurseiro_pro_deleted', JSON.stringify(deletedIds));
  }
};
