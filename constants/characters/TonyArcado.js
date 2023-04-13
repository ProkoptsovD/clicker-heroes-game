import appearence from '../../assets/icons/characters/gang_character_01_bank.svg';
import location from '../../assets/icons/locations/bank.svg';
import miniIcon from '../../assets/images/character-icons/gang_character_icon_01.png';

export const TonyArcado = {
  name: 'Tony Arcado',
  nickname: 'The CockRoach',
  stamina: 5,
  level: 1,
  appearence,
  location,
  miniIcon,
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
