import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Layout } from './Layout';
import { createFlashcard, updateFlashcard, getFlashcardById } from '../utils/api';
import { ChevronLeft, Save } from 'lucide-react';

export function CardForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({ disciplina: '', pergunta: '', resposta: '' });
  const [errors, setErrors] = useState({ disciplina: '', pergunta: '', resposta: '' });
  const [loadingCard, setLoadingCard] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEditing || !id) return;
    async function load() {
      setLoadingCard(true);
      const card = await getFlashcardById(parseInt(id!));
      if (card) {
        setFormData({ disciplina: card.disciplina, pergunta: card.pergunta, resposta: card.resposta });
      }
      setLoadingCard(false);
    }
    load();
  }, [id, isEditing]);

  const validateForm = () => {
    const newErrors = { disciplina: '', pergunta: '', resposta: '' };
    let isValid = true;
    if (!formData.disciplina.trim()) { newErrors.disciplina = 'A disciplina é obrigatória'; isValid = false; }
    if (!formData.pergunta.trim()) { newErrors.pergunta = 'A pergunta é obrigatória'; isValid = false; }
    if (!formData.resposta.trim()) { newErrors.resposta = 'A resposta é obrigatória'; isValid = false; }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSaving(true);
    if (isEditing && id) {
      await updateFlashcard(parseInt(id), formData);
    } else {
      await createFlashcard(formData);
    }
    setSaving(false);
    navigate('/manage');
  };

  const inputClass = (field: keyof typeof errors) =>
    `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3F51B5] focus:border-transparent outline-none transition-all ${
      errors[field] ? 'border-red-500' : 'border-gray-300'
    }`;

  if (loadingCard) {
    return (
      <Layout showNav={false}>
        <div className="max-w-md mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-10 h-10 border-4 border-[#3F51B5] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-500">Carregando card...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showNav={false}>
      <div className="max-w-md mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/manage')}
            className="text-[#3F51B5] hover:bg-blue-50 p-2 rounded-lg transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditing ? 'Editar Flashcard' : 'Novo Flashcard'}
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="disciplina" className="block text-sm font-medium text-gray-700 mb-2">
              Disciplina <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="disciplina"
              value={formData.disciplina}
              onChange={(e) => setFormData({ ...formData, disciplina: e.target.value })}
              placeholder="Ex: Direito Administrativo"
              className={inputClass('disciplina')}
            />
            {errors.disciplina && <p className="text-red-500 text-sm mt-1">{errors.disciplina}</p>}
          </div>

          <div>
            <label htmlFor="pergunta" className="block text-sm font-medium text-gray-700 mb-2">
              Pergunta <span className="text-red-500">*</span>
            </label>
            <textarea
              id="pergunta"
              value={formData.pergunta}
              onChange={(e) => setFormData({ ...formData, pergunta: e.target.value })}
              placeholder="Digite a pergunta ou conceito a ser memorizado..."
              rows={4}
              className={`${inputClass('pergunta')} resize-none`}
            />
            {errors.pergunta && <p className="text-red-500 text-sm mt-1">{errors.pergunta}</p>}
          </div>

          <div>
            <label htmlFor="resposta" className="block text-sm font-medium text-gray-700 mb-2">
              Resposta <span className="text-red-500">*</span>
            </label>
            <textarea
              id="resposta"
              value={formData.resposta}
              onChange={(e) => setFormData({ ...formData, resposta: e.target.value })}
              placeholder="Digite o gabarito ou explicação detalhada..."
              rows={5}
              className={`${inputClass('resposta')} resize-none`}
            />
            {errors.resposta && <p className="text-red-500 text-sm mt-1">{errors.resposta}</p>}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>ℹ️ Dica:</strong> O card será agendado automaticamente para revisão hoje
              com o status "Novo". Você poderá avaliá-lo durante a revisão.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/manage')}
              disabled={saving}
              className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors disabled:opacity-60"
              style={{ minHeight: '48px' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 px-4 bg-[#3F51B5] hover:bg-[#303F9F] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ minHeight: '48px' }}
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save size={20} />
              )}
              <span>{isEditing ? 'Salvar Alterações' : 'Salvar Flashcard'}</span>
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
