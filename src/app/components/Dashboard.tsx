import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Layout } from './Layout';
import { getAllFlashcards, getFlashcardsForReview } from '../utils/api';
import { isMakeConfigured } from '../config/webhooks';
import { User, BookOpen, Calendar, Wifi, WifiOff } from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const [totalCards, setTotalCards] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const makeActive = isMakeConfigured();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [all, review] = await Promise.all([
        getAllFlashcards(),
        getFlashcardsForReview(),
      ]);
      setTotalCards(all.length);
      setReviewCount(review.length);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <Layout>
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1A237E] to-[#3F51B5] text-white p-6 shadow-lg">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Concurseiro Pro</h1>
            <p className="text-sm text-blue-100 mt-1">Seu motor de aprovação</p>
          </div>
          <div className="flex items-center gap-3">
            <div
              title={makeActive ? 'Conectado ao Make/Integromat' : 'Usando armazenamento local'}
              className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                makeActive
                  ? 'bg-green-500/30 text-green-100'
                  : 'bg-white/20 text-blue-100'
              }`}
            >
              {makeActive ? <Wifi size={12} /> : <WifiOff size={12} />}
              <span>{makeActive ? 'Make' : 'Local'}</span>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <User size={28} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-md mx-auto p-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-lg p-5 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="text-[#3F51B5]" size={24} />
            </div>
            {loading ? (
              <div className="h-8 w-12 bg-gray-200 rounded animate-pulse mb-1" />
            ) : (
              <p className="text-3xl font-bold text-gray-800">{totalCards}</p>
            )}
            <p className="text-sm text-gray-600 mt-1">Total de Cards</p>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="text-[#FF6F00]" size={24} />
            </div>
            {loading ? (
              <div className="h-8 w-12 bg-gray-200 rounded animate-pulse mb-1" />
            ) : (
              <p className="text-3xl font-bold text-gray-800">{reviewCount}</p>
            )}
            <p className="text-sm text-gray-600 mt-1">Pendentes Hoje</p>
          </div>
        </div>

        {/* Main Action Button */}
        <button
          onClick={() => navigate('/review')}
          className="w-full bg-[#FF6F00] hover:bg-[#E65100] text-white font-bold py-5 rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95"
          style={{ minHeight: '60px' }}
        >
          <div className="flex items-center justify-center gap-3">
            <BookOpen size={24} />
            <span className="text-lg">Começar Revisão do Dia</span>
          </div>
        </button>

        {/* Info Card */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-[#1A237E] mb-2">💡 Dica do Dia</h3>
          <p className="text-sm text-gray-700">
            A repetição espaçada é cientificamente comprovada para combater a curva de esquecimento.
            Revise seus cards diariamente!
          </p>
        </div>
      </div>
    </Layout>
  );
}
