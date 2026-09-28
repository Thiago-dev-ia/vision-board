export type DreamCategory = 
  | 'financas' 
  | 'viagens' 
  | 'materiais' 
  | 'saude' 
  | 'relacionamentos' 
  | 'espiritualidade';

export interface Dream {
  id: string;
  title: string;
  category: DreamCategory;
  imageUrl: string;
  affirmation: string; // e.g. "Eu sou próspero e merecedor de toda abundância"
  targetYear?: string;
  whyItMatters?: string;
  isAchieved?: boolean;
  achievedDate?: string;
  priority?: number;
  tags?: string[];
  createdAt: string;
}

export interface RitualEntry {
  date: string; // YYYY-MM-DD
  type: 'morning' | 'night';
  intentions?: string[];
  gratitudes?: string[];
  victory?: string;
  affirmationOfTheDay?: string;
  moodRating?: number; // 1 to 5
}

export interface LetterToFuture {
  id: string;
  title: string;
  content: string;
  openDate: string; // YYYY-MM-DD
  createdDate: string;
  isSealed: boolean;
}

export type ThemeMode = 'aurora' | 'lunar' | 'cosmic' | 'emerald';

export interface VisionBoardState {
  dreams: Dream[];
  rituals: RitualEntry[];
  letters: LetterToFuture[];
  theme: ThemeMode;
  userMotto: string;
  userName: string;
}
