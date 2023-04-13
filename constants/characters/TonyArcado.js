import { BASE_URL } from '../config.js';

export const TonyArcado = {
  name: 'Tony Arcado',
  nickname: 'The CockRoach',
  stamina: 15,
  level: 1,
  appearence: BASE_URL + '/assets/icons/characters/gang_character_01_bank.svg',
  location: BASE_URL + '/assets/icons/locations/bank.svg',
  miniIcon: BASE_URL + '/assets/images/character-icons/gang_character_icon_01.png',
  phrases: { intro: 'Come on! What are you wiating for???', isArrested: 'Bloody hell!!!' },
  dialogues: [
    {
      enemy: "Well, well, well... Look who's here! Officer {{name}} in a flesh.",
      detective:
        "Give up! Don't make it worse. Your fellows left you. Help yourself to get your prison time off."
    },
    {
      enemy: "Thank's for the bargain. But I'll refuse if you don't mind.",
      detective: "As you wish, Tony. Lucky you are! I'm not in the mood right now."
    }
  ],
  dashboardTheme: 'bank'
};
