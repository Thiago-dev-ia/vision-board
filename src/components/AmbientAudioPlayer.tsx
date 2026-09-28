import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, CloudRain, Waves, Flame, Radio } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface Props {
  className?: string;
}

type TrackType = 'none' | '528hz' | 'drone432' | 'rain' | 'ocean' | 'fire';

export const AmbientAudioPlayer: React.FC<Props> = ({ className = '' }) => {
  const [activeTrack, setActiveTrack] = useState<TrackType>('none');
  const [volume, setVolume] = useState<number>(0.5);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    soundEngine.setMasterVolume(volume);
  }, [volume]);

  const handleSelectTrack = (track: TrackType) => {
    if (activeTrack === track) {
      soundEngine.stopAllAmbient();
      setActiveTrack('none');
    } else {
      setActiveTrack(track);
      if (track !== 'none') {
        soundEngine.playAmbient(track);
      }
    }
  };

  const tracks = [
    { id: '528hz', label: '528Hz Prosperidade', desc: 'Frequência de transformação e milagres', icon: Sparkles, color: 'text-amber-400 border-amber-400/40 bg-amber-500/10' },
    { id: 'drone432', label: '432Hz Paz Profunda', desc: 'Sintonia harmônica com a natureza', icon: Radio, color: 'text-purple-400 border-purple-400/40 bg-purple-500/10' },
    { id: 'rain', label: 'Chuva Suave', desc: 'Gotas relaxantes para acalmar a mente', icon: CloudRain, color: 'text-sky-400 border-sky-400/40 bg-sky-500/10' },
    { id: 'ocean', label: 'Ondas do Mar', desc: 'Ritmo suave das marés para meditar', icon: Waves, color: 'text-cyan-400 border-cyan-400/40 bg-cyan-500/10' },
    { id: 'fire', label: 'Fogueira Acolhedora', desc: 'Estalos quentes de lenha para a noite', icon: Flame, color: 'text-orange-400 border-orange-400/40 bg-orange-500/10' },
  ];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md border ${
          activeTrack !== 'none'
            ? 'bg-amber-500/20 text-amber-300 border-amber-400/40 shadow-lg shadow-amber-500/10 animate-pulse'
            : 'bg-slate-900/60 text-slate-300 border-slate-700/60 hover:bg-slate-800/80 hover:text-white'
        }`}
        title="Sons Ambientes & Frequências"
      >
        {activeTrack !== 'none' ? (
          <>
            <Volume2 className="w-4 h-4 text-amber-400 animate-bounce" />
            <span className="hidden sm:inline">Tocando: {tracks.find(t => t.id === activeTrack)?.label.split(' ')[0]}</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">Som Ambiente</span>
          </>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-3 w-80 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-sm text-slate-100">Áudio Imersivo & Frequências</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">WebAudio 100% Offline</span>
            </div>

            <div className="mt-3 space-y-2">
              {tracks.map(t => {
                const Icon = t.icon;
                const isSelected = activeTrack === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTrack(t.id as TrackType)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? `${t.color} font-medium`
                        : 'border-slate-800 hover:bg-slate-800/50 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/10' : 'bg-slate-800'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-100">{t.label}</div>
                        <div className="text-[10px] text-slate-400">{t.desc}</div>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Volume Control */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <span className="text-[11px] font-mono text-slate-400 w-8 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>

            {activeTrack !== 'none' && (
              <button
                onClick={() => handleSelectTrack('none')}
                className="w-full mt-3 py-1.5 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors border border-rose-500/20"
              >
                Pausar som ambiente
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
