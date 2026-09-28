import React, { useState, useMemo } from 'react';
import type { Dream } from '../types/dream';
import { DreamCard } from './DreamCard';
import { CATEGORIES_CONFIG } from '../data/defaultDreams';
import { Plus, Search, Sparkles, Trophy, Flame } from 'lucide-react';

interface Props {
  dreams: Dream[];
  onAddNew: () => void;
  onEditDream: (dream: Dream) => void;
  onDeleteDream: (id: string) => void;
  onToggleAchieved: (id: string) => void;
  onOpenCinemaAtDream: (index: number) => void;
}

export const BoardGrid: React.FC<Props> = ({
  dreams,
  onAddNew,
  onEditDream,
  onDeleteDream,
  onToggleAchieved,
  onOpenCinemaAtDream,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterAchieved, setFilterAchieved] = useState<'all' | 'pending' | 'achieved'>('all');

  const filteredDreams = useMemo(() => {
    return dreams.filter(d => {
      const matchesCat = selectedCategory === 'all' || d.category === selectedCategory;
      const matchesSearch =
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.affirmation.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAchieved =
        filterAchieved === 'all' ||
        (filterAchieved === 'achieved' && d.isAchieved) ||
        (filterAchieved === 'pending' && !d.isAchieved);

      return matchesCat && matchesSearch && matchesAchieved;
    });
  }, [dreams, selectedCategory, searchQuery, filterAchieved]);

  const totalDreams = dreams.length;
  const achievedDreams = dreams.filter(d => d.isAchieved).length;
  const percentAchieved = totalDreams > 0 ? Math.round((achievedDreams / totalDreams) * 100) : 0;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Top Header & Overview Stats */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Manifestação Contínua
            </span>
            <span className="text-xs text-slate-400">
              {dreams.length} {dreams.length === 1 ? 'meta visual' : 'metas visuais'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-dream text-white mt-2">
            Mural de Realizações & Propósito
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Visualize diariamente com emoção e certeza absoluta de que seus sonhos já são reais.
          </p>
        </div>

        {/* Progress & Add Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="text-slate-400 font-medium">Conquistas</span>
                <span className="font-bold text-amber-300">{achievedDreams} / {totalDreams} ({percentAchieved}%)</span>
              </div>
              <div className="w-36 h-2 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-700"
                  style={{ width: `${percentAchieved}%` }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={onAddNew}
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Novo Sonho</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedCategory === 'all'
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-md'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            Todos ({dreams.length})
          </button>

          {Object.entries(CATEGORIES_CONFIG).map(([key, config]) => {
            const count = dreams.filter(d => d.category === key).length;
            const isSelected = selectedCategory === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-800 text-white border-slate-600 shadow-md ring-1 ring-amber-400/40'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <span>{config.label}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-950/60 text-slate-400">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Status Filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar no quadro..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-amber-400/60 focus:outline-none text-xs text-slate-200 placeholder:text-slate-500"
            />
          </div>

          <div className="flex items-center p-1 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
            <button
              onClick={() => setFilterAchieved('all')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filterAchieved === 'all' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterAchieved('pending')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filterAchieved === 'pending' ? 'bg-slate-800 text-amber-300 font-medium' : 'text-slate-400'
              }`}
            >
              Em foco
            </button>
            <button
              onClick={() => setFilterAchieved('achieved')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filterAchieved === 'achieved' ? 'bg-slate-800 text-emerald-300 font-medium' : 'text-slate-400'
              }`}
            >
              Realizados
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Dream Cards */}
      {filteredDreams.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDreams.map((dream) => {
            const originalIndex = dreams.findIndex(d => d.id === dream.id);
            return (
              <DreamCard
                key={dream.id}
                dream={dream}
                index={originalIndex}
                onEdit={onEditDream}
                onDelete={onDeleteDream}
                onToggleAchieved={onToggleAchieved}
                onOpenCinemaAtDream={onOpenCinemaAtDream}
              />
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center rounded-3xl bg-slate-900/40 border border-slate-800/80 p-8">
          <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto text-amber-400 mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-slate-200">Nenhum sonho encontrado</h3>
          <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
            {searchQuery
              ? 'Tente ajustar sua busca ou limpar os filtros para ver suas metas.'
              : 'Seu quadro está pronto para receber suas maiores visões de futuro!'}
          </p>
          <button
            onClick={onAddNew}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Criar Primeiro Sonho</span>
          </button>
        </div>
      )}
    </div>
  );
};
