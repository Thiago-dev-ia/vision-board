import React, { useState, useEffect, useRef } from 'react';
import type { Dream } from '../types/dream';
import { CATEGORIES_CONFIG } from '../data/defaultDreams';
import { X, Play, Pause, ChevronLeft, ChevronRight, Sparkles, Volume2, Maximize2, Minimize2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  dreams: Dream[];
  initialIndex?: number;
}

export const ManifestationCinema: React.FC<Props> = ({
  isOpen,
  onClose,
  dreams,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(8); // seconds per slide
  const [isFullscreen, setIsFullscreen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Handle Autoplay Slideshow
  useEffect(() => {
    if (!isOpen) return;

    if (isPlaying && dreams.length > 0) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % dreams.length);
      }, duration * 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPlaying, duration, dreams.length]);

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % dreams.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + dreams.length) % dreams.length);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, dreams.length, onClose]);

  if (!isOpen || dreams.length === 0) return null;

  const currentDream = dreams[currentIndex];
  const catConfig = CATEGORIES_CONFIG[currentDream.category] || CATEGORIES_CONFIG.materiais;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % dreams.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + dreams.length) % dreams.length);
  };

  const toggleFullscreenMode = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between overflow-hidden animate-in fade-in duration-500 select-none">
      {/* Background Image with Slow Ambient Movement (Ken Burns) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          key={currentDream.id}
          src={currentDream.imageUrl}
          alt={currentDream.title}
          className="w-full h-full object-cover animate-kenburns transition-opacity duration-1000"
        />
        {/* Soft Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
      </div>

      {/* Top Bar Navigation & Controls */}
      <div className="relative z-20 flex items-center justify-between px-6 py-6 sm:px-12 backdrop-blur-xs bg-slate-950/30">
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Cinema de Manifestação</span>
          </span>
          <span className="text-xs text-slate-300 font-mono">
            {currentIndex + 1} de {dreams.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all active:scale-95"
            title={isPlaying ? 'Pausar transição automática' : 'Continuar reprodução'}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-amber-300" /> : <Play className="w-4 h-4 text-amber-300" />}
          </button>

          {/* Sound Trigger */}
          <button
            onClick={() => soundEngine.playAmbient('528hz')}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all active:scale-95"
            title="Tocar Frequência 528Hz"
          >
            <Volume2 className="w-4 h-4 text-amber-400" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreenMode}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all hidden sm:flex"
            title="Modo Tela Cheia"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-rose-500/20 hover:bg-rose-500/40 border border-rose-500/30 text-rose-300 backdrop-blur-md transition-all active:scale-95"
            title="Sair do modo imersivo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Focus Affirmation & Goal Typography */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 text-center my-auto space-y-6">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide text-white bg-slate-900/80 border border-white/20 backdrop-blur-md shadow-2xl">
          <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${catConfig.badgeColor}`} />
          {catConfig.label}
          {currentDream.targetYear && (
            <span className="font-mono text-amber-300 ml-1">({currentDream.targetYear})</span>
          )}
        </div>

        {/* Dream Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-serif-dream tracking-tight text-white drop-shadow-2xl leading-tight">
          {currentDream.title}
        </h1>

        {/* Present Tense Powerful Affirmation */}
        <div className="relative max-w-3xl mx-auto py-4">
          <p className="text-xl sm:text-3xl md:text-3xl font-serif-dream italic text-amber-200 drop-shadow-lg leading-relaxed">
            "{currentDream.affirmation}"
          </p>
        </div>

        {/* Why it Matters Note */}
        {currentDream.whyItMatters && (
          <p className="text-sm sm:text-base text-slate-300/90 font-light max-w-xl mx-auto backdrop-blur-xs bg-slate-950/40 py-2 px-4 rounded-xl border border-white/10">
            🎯 <strong className="text-white">Propósito:</strong> {currentDream.whyItMatters}
          </p>
        )}
      </div>

      {/* Bottom Controls & Visual Timeline Bar */}
      <div className="relative z-20 px-6 sm:px-12 pb-8 pt-4 space-y-4 backdrop-blur-xs bg-slate-950/30">
        {/* Animated Progress Bar for Slide Timer */}
        {isPlaying && (
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              key={currentIndex}
              className="h-full bg-gradient-to-r from-amber-400 via-purple-400 to-emerald-400 rounded-full"
              style={{
                animation: `slideProgress ${duration}s linear forwards`,
              }}
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 backdrop-blur-md transition-all active:scale-95"
              title="Sonho anterior (Seta esquerda)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 backdrop-blur-md transition-all active:scale-95"
              title="Próximo sonho (Seta direita)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Quick thumbnails selector */}
          <div className="hidden md:flex items-center gap-2 overflow-x-auto max-w-md py-1 no-scrollbar">
            {dreams.map((d, idx) => (
              <button
                key={d.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-12 h-8 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                  idx === currentIndex
                    ? 'border-amber-400 scale-110 shadow-lg'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={d.imageUrl} alt={d.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Duration Selector */}
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="hidden sm:inline">Ritmo:</span>
            {[6, 10, 15].map((sec) => (
              <button
                key={sec}
                onClick={() => setDuration(sec)}
                className={`px-2.5 py-1 rounded-lg border font-mono transition-all ${
                  duration === sec
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400/60 font-bold'
                    : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-400'
                }`}
              >
                {sec}s
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};
