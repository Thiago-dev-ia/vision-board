import React, { useState } from 'react';
import { Sparkles, RefreshCw, Volume2 } from 'lucide-react';
import { DAILY_AFFIRMATIONS } from '../data/defaultDreams';
import { soundEngine } from '../utils/soundEngine';

interface Props {
  className?: string;
}

export const AffirmationTicker: React.FC<Props> = ({ className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    setIsAnimating(true);
    soundEngine.playChime();
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % DAILY_AFFIRMATIONS.length);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-indigo-500/10 p-[1px] shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-slate-950/70 backdrop-blur-xl px-5 py-3.5 border border-white/10">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div className="text-left flex-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400/90 font-mono">
                Afirmação de Poder do Dia
              </span>
              <p
                className={`text-sm sm:text-base font-serif-dream italic text-slate-100 transition-all duration-300 ${
                  isAnimating ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
                }`}
              >
                "{DAILY_AFFIRMATIONS[currentIndex]}"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-all active:scale-95"
              title="Próxima afirmação inspiradora"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAnimating ? 'animate-spin' : ''}`} />
              <span>Nova Frase</span>
            </button>
            <button
              onClick={() => soundEngine.playChime()}
              className="p-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 transition-all active:scale-95"
              title="Tocar sino de presença e sintonia"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
