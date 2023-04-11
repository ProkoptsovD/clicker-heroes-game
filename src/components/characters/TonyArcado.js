import { Enemy } from '../../lib/Enemy.js';

export const TonyArcado = new Enemy({
  name: 'Tony Arcado',
  nickname: 'The CockRoach',
  stamina: 10,
  level: 1,
  appearence: '/src/assets/icons/characters/gang_character_01_bank.svg',
  location: '/src/assets/icons/locations/bank.svg',
  phrases: { intro: 'Come on! What are you wiating for???', isArrested: 'Bloody hell!!!' },
  dialogues: [
    {
      enemy: "Well, well, well... Look who's here! {{name}} in a flesh",
      detective:
        "Give up! Don't make it worse. Your fellows left you. Help yourself to get your prison time off."
    },
    {
      enemy: "Thank's for the bargain. But I'll refuse if you don't mind.",
      detective: "As you wish, Tony. Lucky you are! I'm not in the mood right now."
    }
  ],
  dashboardTheme: 'bank'
});
