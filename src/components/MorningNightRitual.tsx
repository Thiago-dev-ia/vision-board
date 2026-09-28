import React, { useState, useEffect } from 'react';
import type { RitualEntry } from '../types/dream';
import { Sun, Moon, Sparkles, Check, Heart, Trophy, Wind, ArrowRight, Play, Pause, X } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSaveRitual: (entry: RitualEntry) => void;
  initialType?: 'morning' | 'night';
}

export const MorningNightRitual: React.FC<Props> = ({
  isOpen,
  onClose,
  onSaveRitual,
  initialType = 'morning',
}) => {
  const [ritualType, setRitualType] = useState<'morning' | 'night'>(initialType);
  const [step, setStep] = useState<number>(1);

  // Form State
  const [intentions, setIntentions] = useState<string[]>(['', '', '']);
  const [gratitudes, setGratitudes] = useState<string[]>(['', '', '']);
  const [victory, setVictory] = useState<string>('');
  const [selectedAffirmation, setSelectedAffirmation] = useState<string>('Hoje eu, Thiago, atraio saúde inabalável, sabedoria, riqueza e vitórias extraordinárias.');
  const [moodRating, setMoodRating] = useState<number>(5);

  // Breathing Box State (4-7-8)
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathTimer, setBreathTimer] = useState<number>(4);
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(false);

  useEffect(() => {
    setRitualType(initialType);
    setStep(1);
  }, [initialType, isOpen]);

  // 4-7-8 Breathing Cycle
  useEffect(() => {
    if (!isBreathingActive) return;

    const interval = setInterval(() => {
      setBreathTimer((prev) => {
        if (prev <= 1) {
          if (breathPhase === 'Inhale') {
            setBreathPhase('Hold');
            return 7;
          } else if (breathPhase === 'Hold') {
            setBreathPhase('Exhale');
            return 8;
          } else {
            setBreathPhase('Inhale');
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreathingActive, breathPhase]);

  if (!isOpen) return null;

  const handleFinish = () => {
    soundEngine.playChime();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ritualType === 'morning' ? ['#F59E0B', '#FBBF24', '#38BDF8'] : ['#818CF8', '#C084FC', '#38BDF8'],
    });

    const entry: RitualEntry = {
      date: new Date().toISOString().split('T')[0],
      type: ritualType,
      intentions: ritualType === 'morning' ? intentions.filter(i => i.trim() !== '') : undefined,
      gratitudes: ritualType === 'night' ? gratitudes.filter(g => g.trim() !== '') : undefined,
      victory: ritualType === 'night' ? victory : undefined,
      affirmationOfTheDay: selectedAffirmation,
      moodRating,
    };

    onSaveRitual(entry);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header with Morning / Night Switcher */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setRitualType('morning');
                setStep(1);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                ritualType === 'morning'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Ritual Matinal</span>
            </button>

            <button
              onClick={() => {
                setRitualType('night');
                setStep(1);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                ritualType === 'night'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Moon className="w-4 h-4 text-indigo-400" />
              <span>Ritual Noturno</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Content */}
        <div className="p-6 sm:p-8">
          {/* MORNING RITUAL STEPS */}
          {ritualType === 'morning' && (
            <>
              {step === 1 && (
                <div className="text-center space-y-6">
                  <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Sun className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-serif-dream text-white">
                      Despertar Consciente (Respiração 4-7-8)
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
                      Oxigene o cérebro e prepare seu sistema nervoso para um dia de alta performance e serenidade.
                    </p>
                  </div>

                  {/* Animated Breathing Circle */}
                  <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                    <div
                      className={`absolute inset-0 rounded-full border-2 border-amber-400/40 transition-all duration-1000 ${
                        breathPhase === 'Inhale'
                          ? 'scale-110 bg-amber-500/20 shadow-xl shadow-amber-500/20'
                          : breathPhase === 'Hold'
                          ? 'scale-110 bg-amber-500/30'
                          : 'scale-90 bg-amber-500/5'
                      }`}
                    />
                    <div className="relative z-10 text-center">
                      <Wind className="w-6 h-6 text-amber-400 mx-auto mb-1 animate-pulse" />
                      <div className="text-xs uppercase font-bold tracking-widest text-amber-300">
                        {breathPhase === 'Inhale' ? 'Inspire' : breathPhase === 'Hold' ? 'Segure' : 'Solte o Ar'}
                      </div>
                      <div className="text-3xl font-mono font-bold text-white mt-1">{breathTimer}s</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setIsBreathingActive(!isBreathingActive)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-all"
                    >
                      {isBreathingActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isBreathingActive ? 'Pausar Respiração' : 'Iniciar Guia de Respiração'}</span>
                    </button>
                    <button
                      onClick={() => setStep(2)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-lg"
                    >
                      <span>Próximo Passo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <span className="text-[11px] font-mono text-amber-400 font-bold uppercase">Passo 2 de 3</span>
                    <h2 className="text-xl font-bold font-serif-dream text-white mt-1">
                      Defina as 3 Intenções Inegociáveis de Hoje
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Se você cumprir essas 3 ações, o seu dia já terá sido uma grande vitória.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[0, 1, 2].map((idx) => (
                      <div key={idx} className="relative flex items-center">
                        <span className="absolute left-3.5 text-xs font-mono font-bold text-amber-400">
                          0{idx + 1}.
                        </span>
                        <input
                          type="text"
                          placeholder={
                            idx === 0
                              ? 'Ex: Finalizar proposta comercial com excelência...'
                              : idx === 1
                              ? 'Ex: Fazer 45 min de treino intenso e beber 3L de água...'
                              : 'Ex: Estudar 30 min e ter um momento de qualidade em família...'
                          }
                          value={intentions[idx]}
                          onChange={(e) => {
                            const newArr = [...intentions];
                            newArr[idx] = e.target.value;
                            setIntentions(newArr);
                          }}
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-amber-400 focus:outline-none text-slate-100 text-xs placeholder:text-slate-600"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-lg"
                    >
                      <span>Próximo Passo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <span className="text-[11px] font-mono text-amber-400 font-bold uppercase">Passo 3 de 3</span>
                    <h2 className="text-xl font-bold font-serif-dream text-white mt-1">
                      Afirmação de Poder & Energia do Dia
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Escolha a vibração com a qual você vai caminhar pelo mundo hoje.
                    </p>
                  </div>

                  <textarea
                    rows={3}
                    value={selectedAffirmation}
                    onChange={(e) => setSelectedAffirmation(e.target.value)}
                    className="w-full p-4 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-amber-400 focus:outline-none text-amber-200 text-sm font-serif-dream italic"
                  />

                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                    <p className="text-xs text-slate-300">
                      Respire fundo, sinta a certeza dessas palavras e conquiste o seu dia!
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <button
                      onClick={() => setStep(2)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={handleFinish}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-amber-500/20 active:scale-95"
                    >
                      <Check className="w-4 h-4" />
                      <span>Concluir Ritual & Começar o Dia ✨</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* NIGHT RITUAL STEPS */}
          {ritualType === 'night' && (
            <>
              {step === 1 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <Moon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-indigo-400 font-bold uppercase">Passo 1 de 3</span>
                      <h2 className="text-xl font-bold font-serif-dream text-white">
                        Diário de Gratidões de Hoje
                      </h2>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">
                    A gratidão acalma a mente e abre o subconsciente para a abundância.
                  </p>

                  <div className="space-y-3">
                    {[0, 1, 2].map((idx) => (
                      <div key={idx} className="relative flex items-center">
                        <Heart className="w-4 h-4 text-rose-400 absolute left-3.5" />
                        <input
                          type="text"
                          placeholder={
                            idx === 0
                              ? 'Sou grato(a) por...'
                              : idx === 1
                              ? 'Sou grato(a) pelo momento de...'
                              : 'Sou grato(a) pela oportunidade de...'
                          }
                          value={gratitudes[idx]}
                          onChange={(e) => {
                            const newArr = [...gratitudes];
                            newArr[idx] = e.target.value;
                            setGratitudes(newArr);
                          }}
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-indigo-400 focus:outline-none text-slate-100 text-xs placeholder:text-slate-600"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-end pt-4 border-t border-slate-800">
                    <button
                      onClick={() => setStep(2)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 text-xs font-bold transition-all shadow-lg"
                    >
                      <span>Próximo Passo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-indigo-400 font-bold uppercase">Passo 2 de 3</span>
                      <h2 className="text-xl font-bold font-serif-dream text-white">
                        Sua Maior Vitória de Hoje
                      </h2>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">
                    Reconheça o seu progresso, mesmo as pequenas vitórias silenciosas.
                  </p>

                  <textarea
                    rows={3}
                    placeholder="Ex: Mantive o foco mesmo com imprevistos, fechei um novo cliente e dediquei tempo para mim..."
                    value={victory}
                    onChange={(e) => setVictory(e.target.value)}
                    className="w-full p-4 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-indigo-400 focus:outline-none text-slate-100 text-xs placeholder:text-slate-600"
                  />

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 text-xs font-bold transition-all shadow-lg"
                    >
                      <span>Próximo Passo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5 text-center">
                  <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Sparkles className="w-8 h-8 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-serif-dream text-white">
                      Sono Reparador & Conexão Subconsciente
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto italic font-serif-dream">
                      "Eu, Thiago, entrego este dia com gratidão e serenidade. Enquanto meu corpo descansa, meu subconsciente alinha os caminhos para a realização de todo o meu império e prosperidade."
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left">
                    <div className="text-xs font-semibold text-slate-300 mb-2">Como você avalia seu dia hoje?</div>
                    <div className="flex items-center justify-between gap-2">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          onClick={() => setMoodRating(val)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                            moodRating === val
                              ? 'bg-indigo-500/20 text-indigo-300 border-indigo-400'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {val === 1 ? '😴' : val === 2 ? '🙂' : val === 3 ? '⚡' : val === 4 ? '🔥' : '👑'} {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <button
                      onClick={() => setStep(2)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={handleFinish}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white text-xs font-bold transition-all shadow-lg active:scale-95"
                    >
                      <Check className="w-4 h-4" />
                      <span>Encerrar Dia em Paz 🌙</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
