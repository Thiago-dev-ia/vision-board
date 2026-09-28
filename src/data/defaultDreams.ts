import type { Dream } from '../types/dream';

export const CATEGORIES_CONFIG = {
  financas: {
    label: 'Carreira & Riqueza',
    icon: 'Briefcase',
    badgeColor: 'from-amber-500 to-yellow-600',
    borderColor: 'border-amber-500/30',
    bgGlow: 'rgba(245, 158, 11, 0.15)',
  },
  viagens: {
    label: 'Viagens & Mundo',
    icon: 'Plane',
    badgeColor: 'from-sky-500 to-blue-600',
    borderColor: 'border-sky-500/30',
    bgGlow: 'rgba(14, 165, 233, 0.15)',
  },
  materiais: {
    label: 'Estilo de Vida & Conquistas',
    icon: 'Sparkles',
    badgeColor: 'from-purple-500 to-indigo-600',
    borderColor: 'border-purple-500/30',
    bgGlow: 'rgba(168, 85, 247, 0.15)',
  },
  saude: {
    label: 'Saúde, Físico & Energia',
    icon: 'Heart',
    badgeColor: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-500/30',
    bgGlow: 'rgba(16, 185, 129, 0.15)',
  },
  relacionamentos: {
    label: 'Família & Conexões',
    icon: 'Users',
    badgeColor: 'from-rose-500 to-pink-600',
    borderColor: 'border-rose-500/30',
    bgGlow: 'rgba(244, 63, 94, 0.15)',
  },
  espiritualidade: {
    label: 'Mindset & Sabedoria',
    icon: 'Compass',
    badgeColor: 'from-violet-500 to-fuchsia-600',
    borderColor: 'border-violet-500/30',
    bgGlow: 'rgba(139, 92, 246, 0.15)',
  },
};

export const DEFAULT_DREAMS: Dream[] = [
  {
    id: 'dream-1',
    title: 'Porsche 911 GT3 / Macan Turbo',
    category: 'materiais',
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    affirmation: 'Eu dirijo o carro dos meus sonhos com liberdade, segurança e realização.',
    targetYear: '2026',
    whyItMatters: 'Símbolo de maestria, engenharia e vitória pessoal diária.',
    isAchieved: false,
    createdAt: '2026-01-01',
  },
  {
    id: 'dream-2',
    title: 'Casa dos Sonhos com Vista Panorâmica & Piscina Infinita',
    category: 'materiais',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    affirmation: 'Meu lar é um santuário de paz, conforto absoluto, beleza e inspiração.',
    targetYear: '2027',
    whyItMatters: 'Proporcionar segurança e momentos inesquecíveis para quem eu amo.',
    isAchieved: false,
    createdAt: '2026-01-01',
  },
  {
    id: 'dream-3',
    title: 'Férias na Costa Amalfitana & Capri',
    category: 'viagens',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    affirmation: 'Eu viajo o mundo nos melhores hotéis, vivendo experiências extraordinárias.',
    targetYear: '2026',
    whyItMatters: 'Expandir minha visão de mundo e saborear a vida ao máximo.',
    isAchieved: false,
    createdAt: '2026-01-01',
  },
  {
    id: 'dream-4',
    title: 'Liberdade Financeira & Múltiplas Fontes de Renda',
    category: 'financas',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    affirmation: 'O dinheiro flui para a minha vida de forma abundante, contínua e ética.',
    targetYear: '2026',
    whyItMatters: 'Ter tempo total para focar no que realmente importa na vida.',
    isAchieved: false,
    createdAt: '2026-01-01',
  },
  {
    id: 'dream-5',
    title: 'Corpo Atlético, Alta Energia & Vitalidade',
    category: 'saude',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    affirmation: 'Meu corpo é forte, saudável, ágil e cheio de disposição todos os dias.',
    targetYear: 'Constante',
    whyItMatters: 'A saúde é o alicerce para desfrutar de todas as outras conquistas.',
    isAchieved: false,
    createdAt: '2026-01-01',
  },
  {
    id: 'dream-6',
    title: 'Bangalô Sobre as Águas nas Maldivas',
    category: 'viagens',
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    affirmation: 'Eu desfruto de momentos de pura paz, águas cristalinas e descanso nobre.',
    targetYear: '2027',
    whyItMatters: 'Conexão profunda com a natureza e com o presente.',
    isAchieved: false,
    createdAt: '2026-01-01',
  },
  {
    id: 'dream-7',
    title: 'Paz de Espírito & Autoconfiança Inabalável',
    category: 'espiritualidade',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    affirmation: 'Eu confio no processo da vida. Tenho clareza mental e serenidade interna.',
    targetYear: 'Diário',
    whyItMatters: 'Manter a mente blindada contra qualquer ruído ou ansiedade.',
    isAchieved: false,
    createdAt: '2026-01-01',
  },
  {
    id: 'dream-8',
    title: 'Setup & Escritório Produtivo de Alto Nível',
    category: 'materiais',
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80',
    affirmation: 'Meu espaço de trabalho potencializa meu foco, genialidade e criatividade.',
    targetYear: '2026',
    whyItMatters: 'Criar projetos inovadores com máxima ergonomia e elegância.',
    isAchieved: false,
    createdAt: '2026-01-01',
  },
  {
    id: 'dream-9',
    title: 'Relacionamento Próspero, Amor & Parceria Verdadeira',
    category: 'relacionamentos',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    affirmation: 'Sou cercado de pessoas leais, amorosas e que vibram com o meu sucesso.',
    targetYear: 'Constante',
    whyItMatters: 'O sucesso só tem valor real quando compartilhado com quem amamos.',
    isAchieved: false,
    createdAt: '2026-01-01',
  }
];

export const DAILY_AFFIRMATIONS = [
  "Thiago, sua capacidade de criar valor, liderar e prosperar é ilimitada.",
  "Eu sou Thiago, e minha mente é um ímã irresistível para riqueza, saúde e grandes oportunidades.",
  "Thiago, cada decisão sua hoje é guiada por sabedoria, coragem e foco implacável.",
  "Eu mereço viver o mais alto padrão de vida, conforto e liberdade que este mundo pode oferecer.",
  "Thiago, a disciplina diária é o seu maior superpoder. Você já venceu.",
  "Eu atraio pessoas extraordinárias, leais e prósperas para a minha vida e negócios.",
  "Thiago, seu corpo é forte, sua energia é inesgotável e sua mente é blindada.",
  "Eu durmo em paz com o dever cumprido e acordo pronto para conquistar meus maiores objetivos.",
  "Thiago, nada é capaz de parar um homem focado que sabe exatamente onde quer chegar.",
  "A riqueza e a prosperidade fluem para as mãos de Thiago de forma abundante, ética e contínua.",
  "Hoje eu construo o meu legado com excelência, maestria e paixão absoluta."
];

export const PHOTO_PRESETS = [
  {
    label: 'Carro Esportivo',
    url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    category: 'materiais'
  },
  {
    label: 'Mansão Moderna',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    category: 'materiais'
  },
  {
    label: 'Capri / Itália',
    url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    category: 'viagens'
  },
  {
    label: 'Maldivas / Paraíso',
    url: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    category: 'viagens'
  },
  {
    label: 'Tóquio / Metrópole',
    url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    category: 'viagens'
  },
  {
    label: 'Liberdade Financeira',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    category: 'financas'
  },
  {
    label: 'Treino & Saúde',
    url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    category: 'saude'
  },
  {
    label: 'Meditação ao Pôr do Sol',
    url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    category: 'espiritualidade'
  },
  {
    label: 'Setup Minimalista',
    url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80',
    category: 'materiais'
  },
  {
    label: 'Amizade & Celebração',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    category: 'relacionamentos'
  },
  {
    label: 'Montanhas da Suíça',
    url: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    category: 'viagens'
  },
  {
    label: 'Iate & Luxo no Mar',
    url: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=1200&q=80',
    category: 'materiais'
  }
];
