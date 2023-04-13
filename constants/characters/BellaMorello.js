import { BASE_URL } from '../config.js';

export const BellaMorello = {
  name: 'Bella Morelo',
  nickname: 'Lovely B',
  stamina: 5,
  level: 2,
  size: { width: 'auto', height: '360px' },
  className: 'bellaMorelo',
  appearence: BASE_URL + '/assets/icons/characters/gang_character_02_club.svg',
  location: BASE_URL + '/assets/icons/locations/club.svg',
  miniIcon: BASE_URL + '/assets/images/character-icons/gang_character_icon_02.png',
  phrases: {
    intro: 'Shall we start, darling?',
    isArrested: 'I tried so hard and got so far, but in the end...'
  },
  dialogues: [
    {
      enemy:
        "Mister {{name}}! Can't say I'm glad to see you. But it's good we have met here. This is my favorite place. Let me ask you, how did you know I was here, Detective?",
      detective:
        "Police officers found a bill from the J&S Bar at the crime scene. It is yellow, with straight logo - two black capitalized letters in the middle. There's only one in the whole town. And he still smells like a woman's perfume."
    },
    {
      enemy:
        "It was an anniversary check. 1000 shots of The Green Mexican coctail. Couldn't just throw it away. Let's proceed to detention, Detective.",
      detective: "You could be a good singer, Lovely B . But what's done is done. Let's start."
    }
  ],
  dashboardTheme: 'club'
};
