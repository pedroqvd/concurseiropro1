import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Layout } from './Layout';
import { getFlashcardsForReview, updateFlashcardFeedback } from '../utils/api';
import { Flashcard } from '../utils/storage';
import { ChevronLeft, RotateCcw } from 'lucide-react';

export function Review() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const reviewCards = await getFlashcardsForReview();
      setCards(reviewCards);
      setLoading(false);
    }
    load();
  }, []);

  const currentCard = cards[currentIndex];

  const handleFeedback = async (feedback: 'Errei' | 'Bom' | 'Fácil') => {
    if (!currentCard || submitting) return;
    setSubmitting(true);

    await updateFlashcardFeedback(currentCard.id, feedback);

    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowAnswer(false);
        setSubmitting(false);
      } else {
        navigate('/');
      }
    }, 300);
  };

  const handleRevealAnswer = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setShowAnswer(true);
      setIsFlipping(false);
    }, 150);
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-md mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-10 h-10 border-4 border-[#3F51B5] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-500">Carregando cards...</p>
        </div>
      </Layout>
    );
  }

  if (cards.length === 0) {
    return (
      <Layout>
        <div className="max-w-md mx-auto p-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#3F51B5] mb-6"
          >
            <ChevronLeft size={20} />
            <span>Voltar</span>
          </button>

          <div className="bg-white rounded-lg p-8 shadow-md text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Parabéns!</h2>
            <p className="text-gray-600">
              Você não tem cards pendentes para revisar hoje. Continue assim!
            </p>
            <button
              onClick={() => navigate('/manage')}
              className="mt-6 bg-[#3F51B5] text-white py-3 px-6 rounded-lg hover:bg-[#303F9F] transition-colors"
            >
              Gerenciar Cards
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#3F51B5]"
          >
            <ChevronLeft size={20} />
            <span>Voltar</span>
          </button>
          <div className="text-sm text-gray-600">
            {currentIndex + 1} / {cards.length}
          </div>
        </div>

        {/* Discipline Badge */}
        <div className="mb-4">
          <span className="inline-block bg-[#3F51B5] text-white px-4 py-2 rounded-full text-sm font-medium">
            {currentCard.disciplina}
          </span>
        </div>

        {/* Flashcard */}
        <div
          className={`bg-white rounded-2xl shadow-xl p-8 mb-6 min-h-[400px] flex flex-col justify-center transition-all duration-150 ${
            isFlipping ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
          }`}
        >
          {!showAnswer ? (
            <>
              <div className="text-center mb-4">
                <span className="text-xs uppercase tracking-wide text-gray-500 font-medium">
                  Pergunta
                </span>
              </div>
              <p className="text-lg text-gray-800 leading-relaxed text-center">
                {currentCard.pergunta}
              </p>
            </>
          ) : (
            <>
              <div className="text-center mb-2">
                <span className="text-xs uppercase tracking-wide text-gray-400 font-medium">
                  Pergunta
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed text-center mb-6 pb-6 border-b border-gray-200">
                {currentCard.pergunta}
              </p>
              <div className="text-center mb-4">
                <span className="text-xs uppercase tracking-wide text-[#FF6F00] font-medium">
                  Resposta
                </span>
              </div>
              <p className="text-lg text-gray-800 leading-relaxed text-center font-medium">
                {currentCard.resposta}
              </p>
            </>
          )}
        </div>

        {/* Action Buttons */}
        {!showAnswer ? (
          <button
            onClick={handleRevealAnswer}
            className="w-full bg-[#3F51B5] hover:bg-[#303F9F] text-white font-bold py-4 rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            style={{ minHeight: '56px' }}
          >
            <RotateCcw size={20} />
            <span>Revelar Resposta</span>
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-center text-sm text-gray-600 mb-2">
              Como você avalia seu conhecimento?
            </p>
            {(['Errei', 'Bom', 'Fácil'] as const).map((fb) => {
              const config = {
                Errei: { emoji: '🔴', color: 'bg-red-500 hover:bg-red-600', label: 'Revisar amanhã' },
                Bom: { emoji: '🟡', color: 'bg-yellow-500 hover:bg-yellow-600', label: 'Revisar em 3 dias' },
                Fácil: { emoji: '🟢', color: 'bg-green-500 hover:bg-green-600', label: 'Revisar em 7 dias' },
              }[fb];
              return (
                <button
                  key={fb}
                  onClick={() => handleFeedback(fb)}
                  disabled={submitting}
                  className={`w-full ${config.color} text-white font-bold py-4 rounded-lg shadow-md transition-all transform hover:scale-105 active:scale-95 disabled:opacity-60 disabled:scale-100`}
                  style={{ minHeight: '56px' }}
                >
                  {config.emoji} {fb}
                  <span className="block text-xs mt-1 opacity-90">({config.label})</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
