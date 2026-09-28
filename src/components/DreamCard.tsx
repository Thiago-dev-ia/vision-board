import React, { useState } from 'react';
import type { Dream } from '../types/dream';
import { CATEGORIES_CONFIG } from '../data/defaultDreams';
import { CheckCircle2, Edit3, Trash2, Calendar, Heart, Sparkles, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEngine';

interface Props {
  dream: Dream;
  onEdit: (dream: Dream) => void;
  onDelete: (id: string) => void;
  onToggleAchieved: (id: string) => void;
  onOpenCinemaAtDream: (index: number) => void;
  index: number;
}

export const DreamCard: React.FC<Props> = ({
  dream,
  onEdit,
  onDelete,
  onToggleAchieved,
  onOpenCinemaAtDream,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const categoryInfo = CATEGORIES_CONFIG[dream.category] || CATEGORIES_CONFIG.materiais;

  const handleAchieveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!dream.isAchieved) {
      soundEngine.playChime();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#8B5CF6', '#10B981', '#38BDF8', '#EC4899'],
      });
    }
    onToggleAchieved(dream.id);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-3xl overflow-hidden transition-all duration-500 border ${
        dream.isAchieved
          ? 'border-emerald-500/60 shadow-xl shadow-emerald-500/10'
          : 'border-white/10 hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-500/10'
      } bg-slate-900/80 backdrop-blur-md flex flex-col h-[380px]`}
    >
      {/* Background Image Container */}
      <div className="relative w-full h-[62%] overflow-hidden bg-slate-950">
        <img
          src={dream.imageUrl}
          alt={dream.title}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${dream.isAchieved ? 'grayscale-[0.3]' : ''}`}
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Category & Status Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide text-white bg-gradient-to-r ${categoryInfo.badgeColor} shadow-md backdrop-blur-md flex items-center gap-1.5`}
          >
            <Sparkles className="w-3 h-3" />
            {categoryInfo.label}
          </span>

          {dream.targetYear && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-mono text-slate-200 bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-400" />
              {dream.targetYear}
            </span>
          )}
        </div>

        {/* Hover Quick Actions */}
        <div
          className={`absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center gap-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={() => onOpenCinemaAtDream(index)}
            className="p-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg font-medium text-xs flex items-center gap-1.5 transition-all transform hover:scale-105"
            title="Visualizar em Modo Cinema"
          >
            <Eye className="w-4 h-4" />
            <span>Imersão</span>
          </button>
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="p-2.5 rounded-full bg-slate-800/90 hover:bg-slate-700 text-white border border-white/20 shadow-lg text-xs transition-all transform hover:scale-105"
            title="Ver Afirmação Completa"
          >
            <Heart className="w-4 h-4 text-rose-400" />
          </button>
        </div>

        {/* Achieved Stamp */}
        {dream.isAchieved && (
          <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-emerald-500/90 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg backdrop-blur-md">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Realizado ✨</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between relative bg-gradient-to-b from-slate-900/90 to-slate-950">
        <div>
          <h3 className="font-semibold text-base text-slate-100 line-clamp-1 group-hover:text-amber-300 transition-colors">
            {dream.title}
          </h3>

          <p className="mt-1.5 text-xs text-slate-300/90 font-serif-dream italic line-clamp-2 leading-relaxed">
            "{dream.affirmation}"
          </p>

          {dream.whyItMatters && (
            <p className="mt-2 text-[11px] text-slate-400 line-clamp-1">
              <strong className="text-slate-300">Motivo:</strong> {dream.whyItMatters}
            </p>
          )}
        </div>

        {/* Card Footer Toolbar */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <button
            onClick={handleAchieveClick}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
              dream.isAchieved
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10'
            }`}
            title={dream.isAchieved ? 'Marcar como em andamento' : 'Marcar como conquistado!'}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{dream.isAchieved ? 'Conquistado' : 'Conquistar'}</span>
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(dream)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Editar sonho"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(dream.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Excluir do quadro"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
