import React, { useState, useEffect } from 'react';
import type { Dream, DreamCategory } from '../types/dream';
import { CATEGORIES_CONFIG, PHOTO_PRESETS } from '../data/defaultDreams';
import { X, Sparkles, Upload, Check, Wand2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dream: Dream) => void;
  dreamToEdit?: Dream | null;
}

export const DreamModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  dreamToEdit,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<DreamCategory>('materiais');
  const [imageUrl, setImageUrl] = useState('');
  const [affirmation, setAffirmation] = useState('');
  const [targetYear, setTargetYear] = useState('2026');
  const [whyItMatters, setWhyItMatters] = useState('');
  const [showPresets, setShowPresets] = useState(false);

  useEffect(() => {
    if (dreamToEdit) {
      setTitle(dreamToEdit.title);
      setCategory(dreamToEdit.category);
      setImageUrl(dreamToEdit.imageUrl);
      setAffirmation(dreamToEdit.affirmation);
      setTargetYear(dreamToEdit.targetYear || '2026');
      setWhyItMatters(dreamToEdit.whyItMatters || '');
    } else {
      setTitle('');
      setCategory('materiais');
      setImageUrl('https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80');
      setAffirmation('Eu sou grato por desfrutar dessa conquista com plenitude e paz.');
      setTargetYear('2026');
      setWhyItMatters('');
    }
  }, [dreamToEdit, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImageUrl(reader.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateAffirmation = () => {
    soundEngine.playChime();
    const suggestions = [
      `Eu manifesto ${title ? title.toLowerCase() : 'meus maiores objetivos'} com facilidade, integridade e gratidão profunda.`,
      `Minha vida expande em prosperidade e eu desfruto de ${title ? title.toLowerCase() : 'minhas conquistas'} todos os dias.`,
      `Eu sou digno(a) e preparado(a) para viver a realidade de ${title ? title.toLowerCase() : 'meu sonho'}.`,
      `Agradeço por já viver a abundância e realização de ${title ? title.toLowerCase() : 'minha meta'}.`,
    ];
    const picked = suggestions[Math.floor(Math.random() * suggestions.length)];
    setAffirmation(picked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) return;

    soundEngine.playChime();
    onSave({
      id: dreamToEdit ? dreamToEdit.id : `dream-${Date.now()}`,
      title: title.trim(),
      category,
      imageUrl: imageUrl.trim(),
      affirmation: affirmation.trim() || 'Eu recebo e agradeço por essa bênção na minha vida.',
      targetYear: targetYear.trim(),
      whyItMatters: whyItMatters.trim(),
      isAchieved: dreamToEdit ? dreamToEdit.isAchieved : false,
      createdAt: dreamToEdit ? dreamToEdit.createdAt : new Date().toISOString().split('T')[0],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-serif-dream">
                {dreamToEdit ? 'Editar Meta Visual' : 'Materializar Novo Sonho'}
              </h3>
              <p className="text-xs text-slate-400">Defina os detalhes e a emoção do que você quer viver</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Título do Sonho / Conquista *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Porsche 911 GT3, Mansão na Praia, Viagem Suíça..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-amber-400 focus:outline-none text-slate-100 text-sm placeholder:text-slate-500"
            />
          </div>

          {/* Category & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Categoria *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as DreamCategory)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-amber-400 focus:outline-none text-slate-100 text-sm"
              >
                {Object.entries(CATEGORIES_CONFIG).map(([key, config]) => (
                  <option key={key} value={key} className="bg-slate-900 text-slate-100">
                    {config.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Ano ou Prazo Almejado
              </label>
              <input
                type="text"
                placeholder="Ex: 2026, 2027, Diário, Em breve..."
                value={targetYear}
                onChange={(e) => setTargetYear(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-amber-400 focus:outline-none text-slate-100 text-sm placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Image Selection & Preview */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Imagem do Sonho *
              </label>
              <button
                type="button"
                onClick={() => setShowPresets(!showPresets)}
                className="text-xs text-amber-400 hover:text-amber-300 underline font-medium"
              >
                {showPresets ? 'Ocultar Galeria Rápida' : 'Explorar Fotos Inspiradoras'}
              </button>
            </div>

            {/* Presets Grid */}
            {showPresets && (
              <div className="mb-4 p-3 rounded-2xl bg-slate-950/90 border border-slate-800 grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                {PHOTO_PRESETS.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setImageUrl(p.url);
                      setShowPresets(false);
                    }}
                    className="relative h-16 rounded-lg overflow-hidden cursor-pointer border border-white/10 hover:border-amber-400 transition-all group"
                  >
                    <img src={p.url} alt={p.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center p-1 text-center">
                      <span className="text-[10px] font-bold text-white leading-tight">{p.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Insira a URL da foto (Unsplash, Pinterest, etc)..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-amber-400 focus:outline-none text-slate-100 text-xs placeholder:text-slate-500"
              />
              <label className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer flex items-center gap-1.5 text-xs font-semibold shrink-0">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            {/* Image Preview Box */}
            {imageUrl && (
              <div className="mt-3 relative h-36 rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-slate-950/80 text-[10px] text-slate-200 backdrop-blur-md">
                  Pré-visualização
                </div>
              </div>
            )}
          </div>

          {/* Affirmation & AI Assistant Generator */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Afirmação em Tempo Presente ("Eu Já Tenho / Eu Sou")
              </label>
              <button
                type="button"
                onClick={handleGenerateAffirmation}
                className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 font-medium"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Sugerir Afirmação</span>
              </button>
            </div>
            <textarea
              rows={2}
              placeholder="Ex: Eu dirijo o carro dos meus sonhos com segurança, plenitude e liberdade..."
              value={affirmation}
              onChange={(e) => setAffirmation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-amber-400 focus:outline-none text-slate-100 text-sm font-serif-dream italic placeholder:text-slate-500"
            />
          </div>

          {/* Why It Matters */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Por que essa realização é importante para você?
            </label>
            <input
              type="text"
              placeholder="Ex: Proporcionar estabilidade e viagens inesquecíveis para minha família..."
              value={whyItMatters}
              onChange={(e) => setWhyItMatters(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-amber-400 focus:outline-none text-slate-100 text-xs placeholder:text-slate-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>{dreamToEdit ? 'Atualizar Sonho' : 'Salvar no Meu Quadro'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
