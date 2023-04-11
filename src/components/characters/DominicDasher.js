import { Enemy } from '../../lib/Enemy.js';

export const DominicDasher = new Enemy({
  name: 'Dominic Dasher',
  nickname: 'Fat Dominic',
  stamina: 75,
  level: 4,
  className: 'dominicDasher',
  appearence: '/src/assets/icons/characters/gang_character_04_sunset.svg',
  location: '/src/assets/icons/locations/sunset_street.svg',
  phrases: {
    intro: 'People like you I eat for lunch!',
    isArrested: 'Habe a cigarette for cellmates?'
  },
  dialogues: [
    {
      enemy:
        "What else? Get you a beer? Piss off, you cops. I'm not the kind of person who just goes to jail because some one tells me to. I've been there three times already. I didn't like to be there much.",
      detective:
        'Dominic Dasher! You are under arrest. Lie face down on the ground and put your hands behind your head. Now!'
    },
    {
      enemy:
        "But you found me, not because one of the guys gave me away, but because I was drunk and wandering around town. Not very smart, I know. I haven't been very smart since I was a kid. But I'm strong. Let's see who's who.",
      detective:
        'Where there are three times, there is a fourth one. All your buddies have already been detained and at the same moment are testifying against each other.'
    }
  ],
  dialogOrder: 'detectiveEnemy',
  dashboardTheme: 'sunset-street'
});
