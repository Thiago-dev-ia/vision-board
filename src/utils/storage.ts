import type { VisionBoardState } from '../types/dream';
import { DEFAULT_DREAMS } from '../data/defaultDreams';

const STORAGE_KEY = 'vision_board_app_state_v1';

export const getInitialState = (): VisionBoardState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        dreams: parsed.dreams || DEFAULT_DREAMS,
        rituals: parsed.rituals || [],
        letters: parsed.letters || [],
        theme: parsed.theme || 'cosmic',
        userMotto: parsed.userMotto || 'Eu sou Thiago. Construo meu império com honra, disciplina, visão e foco inabalável.',
        userName: parsed.userName || 'Thiago',
      };
    }
  } catch (e) {
    console.error('Error loading state from localStorage:', e);
  }

  return {
    dreams: DEFAULT_DREAMS,
    rituals: [],
    letters: [
      {
        id: 'letter-sample',
        title: 'Para o Thiago do Futuro: Nosso Império Construído',
        content: 'Querido Thiago do futuro,\n\nSe você está lendo isso, saiba que cada hora de trabalho, cada momento de foco e cada escolha consciente valeram a pena. Você manteve a fé inabalável nos dias desafiadores, protegeu sua energia, cuidou da sua saúde e nunca aceitou nada menos do que a excelência.\n\nHoje nós vivemos a vida que um dia apenas ousamos desenhar. A casa dos sonhos, os carros, a liberdade financeira e a paz de espírito são a nossa realidade diária.\n\nCom orgulho, admiração e gratidão,\nThiago.',
        openDate: '2027-01-01',
        createdDate: new Date().toISOString().split('T')[0],
        isSealed: true,
      }
    ],
    theme: 'cosmic',
    userMotto: 'Eu sou Thiago. Construo meu império com honra, disciplina, visão e foco inabalável.',
    userName: 'Thiago',
  };
};

export const saveState = (state: VisionBoardState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving state to localStorage:', e);
  }
};

export const exportBackupJSON = (state: VisionBoardState) => {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `quadro-dos-sonhos-backup-${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};
