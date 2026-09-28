import React, { useState, useEffect } from 'react';
import type { VisionBoardState, Dream, RitualEntry, LetterToFuture, ThemeMode } from './types/dream';
import { getInitialState, saveState, exportBackupJSON } from './utils/storage';
import { DEFAULT_DREAMS } from './data/defaultDreams';
import { Navbar } from './components/Navbar';
import { AffirmationTicker } from './components/AffirmationTicker';
import { BoardGrid } from './components/BoardGrid';
import { DreamModal } from './components/DreamModal';
import { ManifestationCinema } from './components/ManifestationCinema';
import { MorningNightRitual } from './components/MorningNightRitual';
import { FutureLetterModal } from './components/FutureLetterModal';
import { Sun, Moon, Sparkles, Heart, Quote, Edit2, Check } from 'lucide-react';
import { soundEngine } from './utils/soundEngine';

export const App: React.FC = () => {
  const [state, setState] = useState<VisionBoardState>(getInitialState);

  // Modals state
  const [isDreamModalOpen, setIsDreamModalOpen] = useState(false);
  const [dreamToEdit, setDreamToEdit] = useState<Dream | null>(null);
  const [isCinemaOpen, setIsCinemaOpen] = useState(false);
  const [cinemaInitialIndex, setCinemaInitialIndex] = useState(0);
  const [isRitualOpen, setIsRitualOpen] = useState(false);
  const [ritualType, setRitualType] = useState<'morning' | 'night'>('morning');
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);

  // Motto & Name editing
  const [isEditingMotto, setIsEditingMotto] = useState(false);
  const [tempMotto, setTempMotto] = useState(state.userMotto);
  const [tempName, setTempName] = useState(state.userName);

  // Sync with LocalStorage
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Determine Greeting based on time
  const currentHour = new Date().getHours();
  const isMorning = currentHour >= 5 && currentHour < 12;
  const isAfternoon = currentHour >= 12 && currentHour < 18;

  const greeting = isMorning
    ? 'Bom dia'
    : isAfternoon
    ? 'Boa tarde'
    : 'Boa noite';

  const greetingSub = isMorning
    ? 'Hora de acordar com propósito e visualizar seu futuro extraordinário.'
    : isAfternoon
    ? 'Mantenha a mente firme na abundância e no progresso constante.'
    : 'Agradeça pelo dia, acalme a mente e durma sentindo seus sonhos realizados.';

  // Handlers
  const handleSaveDream = (dream: Dream) => {
    setState((prev) => {
      const existingIndex = prev.dreams.findIndex((d) => d.id === dream.id);
      let updatedDreams: Dream[];
      if (existingIndex >= 0) {
        updatedDreams = [...prev.dreams];
        updatedDreams[existingIndex] = dream;
      } else {
        updatedDreams = [dream, ...prev.dreams];
      }
      return { ...prev, dreams: updatedDreams };
    });
  };

  const handleDeleteDream = (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este sonho do seu quadro?')) {
      setState((prev) => ({
        ...prev,
        dreams: prev.dreams.filter((d) => d.id !== id),
      }));
    }
  };

  const handleToggleAchieved = (id: string) => {
    setState((prev) => ({
      ...prev,
      dreams: prev.dreams.map((d) =>
        d.id === id ? { ...d, isAchieved: !d.isAchieved, achievedDate: !d.isAchieved ? new Date().toISOString().split('T')[0] : undefined } : d
      ),
    }));
  };

  const handleSaveRitual = (entry: RitualEntry) => {
    setState((prev) => ({
      ...prev,
      rituals: [entry, ...prev.rituals],
    }));
  };

  const handleSaveLetter = (letter: LetterToFuture) => {
    setState((prev) => ({
      ...prev,
      letters: [letter, ...prev.letters],
    }));
  };

  const handleThemeChange = (theme: ThemeMode) => {
    setState((prev) => ({ ...prev, theme }));
  };

  const handleExportBackup = () => {
    exportBackupJSON(state);
  };

  const handleImportBackup = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        if (parsed.dreams && Array.isArray(parsed.dreams)) {
          setState(parsed);
          soundEngine.playChime();
          alert('Backup restaurado com sucesso! ✨');
        } else {
          alert('Formato de arquivo inválido.');
        }
      } catch (err) {
        console.error(err);
        alert('Erro ao carregar o arquivo de backup.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    setState((prev) => ({
      ...prev,
      dreams: DEFAULT_DREAMS,
    }));
  };

  const handleOpenCinemaAt = (index: number) => {
    setCinemaInitialIndex(index);
    setIsCinemaOpen(true);
  };

  // Background Theme Palette Classes
  const getThemeBg = () => {
    switch (state.theme) {
      case 'aurora':
        return 'from-amber-950/40 via-slate-950 to-slate-950';
      case 'lunar':
        return 'from-indigo-950/40 via-slate-950 to-slate-950';
      case 'emerald':
        return 'from-emerald-950/40 via-slate-950 to-slate-950';
      case 'cosmic':
      default:
        return 'from-purple-950/30 via-slate-950 to-slate-950';
    }
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200 transition-colors duration-700 font-sans`}>
      {/* Dynamic Background Gradient Aura */}
      <div className={`fixed inset-0 pointer-events-none bg-gradient-to-b ${getThemeBg()} z-0`} />
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="fixed top-1/3 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: '4s' }} />

      <div className="relative z-10 flex flex-col flex-1">
        {/* Navigation Bar */}
        <Navbar
          currentTheme={state.theme}
          onThemeChange={handleThemeChange}
          onOpenRitual={(type) => {
            setRitualType(type);
            setIsRitualOpen(true);
          }}
          onOpenCinema={() => {
            setCinemaInitialIndex(0);
            setIsCinemaOpen(true);
          }}
          onOpenLetter={() => setIsLetterModalOpen(true)}
          onExportBackup={handleExportBackup}
          onImportBackup={handleImportBackup}
          onResetDefaults={handleResetDefaults}
        />

        {/* Main Content Area */}
        <main className="flex-1 pb-16 space-y-6">
          {/* Greeting Hero & Quick Ritual Activation */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/90 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                {/* Greeting & Custom Motto */}
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                      {isMorning ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
                      {greeting}, {state.userName}! ✨
                    </span>
                    <button
                      onClick={() => setIsEditingMotto(!isEditingMotto)}
                      className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
                      title="Personalizar seu nome e lema"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {isEditingMotto ? (
                    <div className="space-y-2 p-3 rounded-2xl bg-slate-950/80 border border-slate-700">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400">Seu Nome / Como prefere ser chamado(a):</label>
                        <input
                          type="text"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400">Seu Lema de Vida / Frase de Poder:</label>
                        <input
                          type="text"
                          value={tempMotto}
                          onChange={(e) => setTempMotto(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-serif-dream"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          onClick={() => setIsEditingMotto(false)}
                          className="px-3 py-1 text-xs text-slate-400"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => {
                            setState((prev) => ({
                              ...prev,
                              userName: tempName.trim() || 'Visionário(a)',
                              userMotto: tempMotto.trim() || prev.userMotto,
                            }));
                            setIsEditingMotto(false);
                            soundEngine.playChime();
                          }}
                          className="px-3 py-1 text-xs font-bold bg-amber-500 text-slate-950 rounded-lg flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Salvar</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-2xl sm:text-4xl font-bold font-serif-dream tracking-tight text-white leading-tight">
                        {greetingSub}
                      </h2>
                      <div className="mt-3 flex items-start gap-2 text-slate-300/90 font-serif-dream italic text-sm sm:text-base">
                        <Quote className="w-4 h-4 text-amber-400/70 shrink-0 mt-0.5" />
                        <span>"{state.userMotto}"</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Ritual Action Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:w-auto shrink-0">
                  <button
                    onClick={() => {
                      setRitualType('morning');
                      setIsRitualOpen(true);
                    }}
                    className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 hover:from-amber-500/30 hover:to-amber-600/20 border border-amber-500/30 transition-all text-left group shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
                        <Sun className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                        Ao Acordar
                      </span>
                    </div>
                    <div className="font-bold text-sm text-slate-100">Ritual Matinal</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      3 Intenções • Respiração • Energia
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setRitualType('night');
                      setIsRitualOpen(true);
                    }}
                    className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-600/10 hover:from-indigo-500/30 hover:to-purple-600/20 border border-indigo-500/30 transition-all text-left group shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform">
                        <Moon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase">
                        Antes de Dormir
                      </span>
                    </div>
                    <div className="font-bold text-sm text-slate-100">Ritual Noturno</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Gratidões • Vitórias • Sono Tranquilo
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Daily Affirmation Ticker */}
          <AffirmationTicker />

          {/* Vision Board Grid */}
          <BoardGrid
            dreams={state.dreams}
            onAddNew={() => {
              setDreamToEdit(null);
              setIsDreamModalOpen(true);
            }}
            onEditDream={(dream) => {
              setDreamToEdit(dream);
              setIsDreamModalOpen(true);
            }}
            onDeleteDream={handleDeleteDream}
            onToggleAchieved={handleToggleAchieved}
            onOpenCinemaAtDream={handleOpenCinemaAt}
          />
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-serif-dream font-semibold text-sm text-slate-300">
                Meu Quadro dos Sonhos
              </span>
              <span className="text-xs text-slate-500">| Hub de Manifestação & Rituais</span>
            </div>
            <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
              Feito com <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> para transformar cada manhã e noite na sua melhor versão.
            </p>
          </div>
        </footer>
      </div>

      {/* MODALS */}
      <DreamModal
        isOpen={isDreamModalOpen}
        onClose={() => setIsDreamModalOpen(false)}
        onSave={handleSaveDream}
        dreamToEdit={dreamToEdit}
      />

      <ManifestationCinema
        isOpen={isCinemaOpen}
        onClose={() => setIsCinemaOpen(false)}
        dreams={state.dreams}
        initialIndex={cinemaInitialIndex}
      />

      <MorningNightRitual
        isOpen={isRitualOpen}
        onClose={() => setIsRitualOpen(false)}
        onSaveRitual={handleSaveRitual}
        initialType={ritualType}
      />

      <FutureLetterModal
        isOpen={isLetterModalOpen}
        onClose={() => setIsLetterModalOpen(false)}
        letters={state.letters}
        onSaveLetter={handleSaveLetter}
      />
    </div>
  );
};

export default App;
