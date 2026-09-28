import React, { useState } from 'react';
import type { ThemeMode } from '../types/dream';
import { AmbientAudioPlayer } from './AmbientAudioPlayer';
import { 
  Sparkles, 
  Film, 
  Sun, 
  Moon, 
  Mail, 
  Download, 
  Upload, 
  RotateCcw, 
  Settings2
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface Props {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onOpenRitual: (type: 'morning' | 'night') => void;
  onOpenCinema: () => void;
  onOpenLetter: () => void;
  onExportBackup: () => void;
  onImportBackup: (file: File) => void;
  onResetDefaults: () => void;
}

export const Navbar: React.FC<Props> = ({
  currentTheme,
  onThemeChange,
  onOpenRitual,
  onOpenCinema,
  onOpenLetter,
  onExportBackup,
  onImportBackup,
  onResetDefaults,
}) => {
  const [showSettings, setShowSettings] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportBackup(file);
      setShowSettings(false);
    }
  };

  const themes: { id: ThemeMode; label: string; icon: string; bg: string }[] = [
    { id: 'cosmic', label: 'Cosmos Escuro', icon: '🌌', bg: 'bg-slate-900' },
    { id: 'aurora', label: 'Aurora Dourada', icon: '🌅', bg: 'bg-amber-950/40' },
    { id: 'lunar', label: 'Noite Lunar', icon: '🌙', bg: 'bg-indigo-950/40' },
    { id: 'emerald', label: 'Esmeralda Zen', icon: '🌿', bg: 'bg-emerald-950/40' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/70 border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="relative p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 via-purple-500 to-indigo-500 text-slate-950 shadow-lg shadow-amber-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold font-serif-dream tracking-tight text-white m-0">
                Meu Quadro dos Sonhos
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-serif-dream italic hidden sm:block">
              "O que a mente pode conceber e acreditar, ela pode realizar."
            </p>
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ambient Sound Module */}
          <AmbientAudioPlayer />

          {/* Morning & Night Ritual Shortcuts */}
          <div className="hidden md:flex items-center p-1 rounded-full bg-slate-900/80 border border-slate-800">
            <button
              onClick={() => onOpenRitual('morning')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-amber-300 hover:bg-amber-500/10 transition-all"
              title="Iniciar Ritual da Manhã"
            >
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Manhã</span>
            </button>
            <button
              onClick={() => onOpenRitual('night')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-indigo-300 hover:bg-indigo-500/10 transition-all"
              title="Iniciar Ritual da Noite"
            >
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              <span>Noite</span>
            </button>
          </div>

          {/* Cinema Mode Button */}
          <button
            onClick={() => {
              soundEngine.playChime();
              onOpenCinema();
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20 transition-all transform active:scale-95 border border-purple-400/30"
            title="Abrir Modo Cinema (Slideshow Fullscreen)"
          >
            <Film className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="hidden sm:inline">Modo Cinema</span>
          </button>

          {/* Time Capsule Button */}
          <button
            onClick={onOpenLetter}
            className="p-2 sm:px-3 sm:py-2 rounded-full text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all flex items-center gap-1.5"
            title="Cartas para o Meu Eu do Futuro"
          >
            <Mail className="w-4 h-4 text-purple-400" />
            <span className="hidden lg:inline">Cápsula do Tempo</span>
          </button>

          {/* Settings & Theme Menu */}
          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-all"
              title="Configurações e Backup"
            >
              <Settings2 className="w-4 h-4" />
            </button>

            {showSettings && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowSettings(false)}
                />
                <div className="absolute right-0 mt-3 w-64 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200 space-y-4">
                  {/* Theme Switcher */}
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Tema Visual
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {themes.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            onThemeChange(t.id);
                          }}
                          className={`p-2 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                            currentTheme === t.id
                              ? 'bg-amber-500/20 text-amber-300 border-amber-400/50'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <span>{t.icon}</span>
                          <span>{t.label.split(' ')[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rituais mobile shortcuts */}
                  <div className="md:hidden pt-2 border-t border-slate-800">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Rituais Diários
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          onOpenRitual('morning');
                          setShowSettings(false);
                        }}
                        className="p-2 rounded-xl bg-amber-500/10 text-amber-300 text-xs font-medium border border-amber-500/30 flex items-center gap-1.5"
                      >
                        <Sun className="w-3.5 h-3.5" />
                        <span>Manhã</span>
                      </button>
                      <button
                        onClick={() => {
                          onOpenRitual('night');
                          setShowSettings(false);
                        }}
                        className="p-2 rounded-xl bg-indigo-500/10 text-indigo-300 text-xs font-medium border border-indigo-500/30 flex items-center gap-1.5"
                      >
                        <Moon className="w-3.5 h-3.5" />
                        <span>Noite</span>
                      </button>
                    </div>
                  </div>

                  {/* Backup & Restore */}
                  <div className="pt-2 border-t border-slate-800 space-y-2">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Seus Dados & Backup
                    </div>
                    <button
                      onClick={() => {
                        onExportBackup();
                        setShowSettings(false);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-2 transition-all border border-slate-700"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span>Exportar Backup (JSON)</span>
                    </button>

                    <label className="w-full py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-2 transition-all border border-slate-700 cursor-pointer">
                      <Upload className="w-3.5 h-3.5 text-sky-400" />
                      <span>Importar Backup</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>

                    <button
                      onClick={() => {
                        if (window.confirm('Deseja restaurar os sonhos padrão? Isso redefinirá seus itens.')) {
                          onResetDefaults();
                          setShowSettings(false);
                        }
                      }}
                      className="w-full py-2 px-3 rounded-xl hover:bg-rose-500/10 text-rose-400 text-xs flex items-center gap-2 transition-all border border-transparent hover:border-rose-500/20"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restaurar Padrões</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
