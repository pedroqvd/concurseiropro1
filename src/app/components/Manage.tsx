import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Layout } from './Layout';
import { getAllFlashcards, deleteFlashcard } from '../utils/api';
import { Flashcard } from '../utils/storage';
import { Plus, Pencil, Trash2, Calendar, X } from 'lucide-react';

export function Manage() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; card: Flashcard | null }>({
    show: false,
    card: null,
  });
  const [deleting, setDeleting] = useState(false);

  const loadCards = async () => {
    setLoading(true);
    setCards(await getAllFlashcards());
    setLoading(false);
  };

  useEffect(() => {
    loadCards();
  }, []);

  const handleDeleteClick = (card: Flashcard) => {
    setDeleteModal({ show: true, card });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.card) return;
    setDeleting(true);
    await deleteFlashcard(deleteModal.card.id);
    setDeleting(false);
    setDeleteModal({ show: false, card: null });
    loadCards();
  };

  const handleCancelDelete = () => {
    setDeleteModal({ show: false, card: null });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Amanhã';
    if (diffDays === -1) return 'Ontem';
    if (diffDays < 0) return `${Math.abs(diffDays)} dias atrás`;
    return `Em ${diffDays} dias`;
  };

  const getLevelColor = (nivel: string) => {
    switch (nivel) {
      case 'Novo': return 'bg-blue-100 text-blue-800';
      case 'Errei': return 'bg-red-100 text-red-800';
      case 'Bom': return 'bg-yellow-100 text-yellow-800';
      case 'Fácil': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto p-6 pb-24">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Meus Flashcards</h1>
          <p className="text-gray-600 text-sm mt-1">
            {loading ? 'Carregando...' : `${cards.length} ${cards.length === 1 ? 'card cadastrado' : 'cards cadastrados'}`}
          </p>
        </div>

        {/* Cards List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-4 shadow-md border border-gray-100 animate-pulse">
                <div className="flex gap-2 mb-3">
                  <div className="h-5 w-28 bg-gray-200 rounded" />
                  <div className="h-5 w-16 bg-gray-200 rounded" />
                </div>
                <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : cards.length === 0 ? (
          <div className="bg-white rounded-lg p-8 shadow-md text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Nenhum card ainda</h2>
            <p className="text-gray-600 mb-4">Comece criando seu primeiro flashcard!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-lg p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-[#3F51B5] bg-blue-50 px-2 py-1 rounded">
                        {card.disciplina}
                      </span>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${getLevelColor(card.nivel)}`}>
                        {card.nivel}
                      </span>
                    </div>
                    <p className="text-gray-800 font-medium line-clamp-2 mb-2">{card.pergunta}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar size={14} />
                      <span>Próxima revisão: {formatDate(card.proxima_revisao)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => navigate(`/card/edit/${card.id}`)}
                      className="p-2 text-[#3F51B5] hover:bg-blue-50 rounded-lg transition-colors"
                      aria-label="Editar"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(card)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Excluir"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FAB */}
        <button
          onClick={() => navigate('/card/new')}
          className="fixed bottom-24 right-6 w-14 h-14 bg-[#FF6F00] hover:bg-[#E65100] text-white rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-110 active:scale-95"
          aria-label="Adicionar novo card"
        >
          <Plus size={28} strokeWidth={2.5} />
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">Confirmar Exclusão</h3>
              <button
                onClick={handleCancelDelete}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Fechar"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir este flashcard? Esta ação não pode ser desfeita.
            </p>
            {deleteModal.card && (
              <div className="bg-gray-50 rounded-lg p-3 mb-6 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1 font-medium">{deleteModal.card.disciplina}</p>
                <p className="text-sm font-medium text-gray-800 line-clamp-2">
                  {deleteModal.card.pergunta}
                </p>
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={handleCancelDelete}
                disabled={deleting}
                className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors disabled:opacity-60"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {deleting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Trash2 size={18} />
                )}
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
