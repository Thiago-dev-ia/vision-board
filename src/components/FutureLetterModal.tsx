import React, { useState } from 'react';
import type { LetterToFuture } from '../types/dream';
import { Mail, Plus, Lock, Unlock, X, Calendar } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  letters: LetterToFuture[];
  onSaveLetter: (letter: LetterToFuture) => void;
}

export const FutureLetterModal: React.FC<Props> = ({
  isOpen,
  onClose,
  letters,
  onSaveLetter,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<LetterToFuture | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [openDate, setOpenDate] = useState('2027-01-01');

  if (!isOpen) return null;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    soundEngine.playChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });

    const newLetter: LetterToFuture = {
      id: `letter-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      openDate,
      createdDate: new Date().toISOString().split('T')[0],
      isSealed: true,
    };

    onSaveLetter(newLetter);
    setIsCreating(false);
    setTitle('');
    setContent('');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-serif-dream">
                Cartas para o Meu Eu do Futuro (Cápsula do Tempo)
              </h3>
              <p className="text-xs text-slate-400">Escreva visões sinceras para abrir em datas marcantes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isCreating ? (
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Título da Mensagem
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Para quando eu estiver faturando 7 dígitos / Casa nova..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-purple-400 focus:outline-none text-slate-100 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Data de Abertura Desejada
                </label>
                <input
                  type="date"
                  required
                  value={openDate}
                  onChange={(e) => setOpenDate(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-purple-400 focus:outline-none text-slate-100 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Conteúdo da Carta
                </label>
                <textarea
                  rows={7}
                  required
                  placeholder="Querido eu do futuro, hoje eu estou trabalhando duro para construir..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-4 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-purple-400 focus:outline-none text-slate-100 text-sm font-serif-dream leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg transition-all"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Selar Carta no Tempo</span>
                </button>
              </div>
            </form>
          ) : selectedLetter ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-xl font-bold font-serif-dream text-amber-300">{selectedLetter.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span>Escrita em: {selectedLetter.createdDate}</span>
                    <span>•</span>
                    <span>Data de Abertura: {selectedLetter.openDate}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="text-xs text-purple-400 hover:text-purple-300"
                >
                  Ver todas as cartas
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 max-h-80 overflow-y-auto font-serif-dream text-slate-200 whitespace-pre-wrap leading-relaxed">
                {selectedLetter.content}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white"
                >
                  Fechar Carta
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {letters.length} {letters.length === 1 ? 'carta guardada' : 'cartas guardadas'}
                </span>
                <button
                  onClick={() => setIsCreating(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-md transition-all active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Escrever Nova Carta</span>
                </button>
              </div>

              {/* Letters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {letters.map((letter) => {
                  const canOpen = today >= letter.openDate;
                  return (
                    <div
                      key={letter.id}
                      onClick={() => setSelectedLetter(letter)}
                      className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between h-40 group"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-purple-400 flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            Abrir em: {letter.openDate}
                          </span>
                          {canOpen ? (
                            <span className="p-1 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                              <Unlock className="w-3 h-3" /> Disponível
                            </span>
                          ) : (
                            <span className="p-1 rounded bg-slate-800 text-slate-400 text-[10px] flex items-center gap-1">
                              <Lock className="w-3 h-3" /> Selada
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-slate-100 mt-2 line-clamp-1 group-hover:text-purple-300 transition-colors">
                          {letter.title}
                        </h4>
                      </div>

                      <div className="text-xs text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800/60">
                        <span className="text-[10px]">Escrita em {letter.createdDate}</span>
                        <span className="text-purple-400 text-xs font-medium group-hover:underline">Ler Carta →</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
