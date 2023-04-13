import appearence from '../../assets/icons/characters/gang_character_04_sunset.svg';
import location from '../../assets/icons/locations/sunset_street.svg';
import miniIcon from '../../assets/images/character-icons/gang_character_icon_04.png';

export const DominicDasher = {
  name: 'Dominic Dasher',
  nickname: 'Fat Dominic',
  stamina: 5,
  level: 4,
  className: 'dominicDasher',
  appearence,
  location,
  miniIcon,
  phrases: {
    intro: 'People like you I eat for lunch!',
    isArrested: 'Have a cigarette for cellmates?'
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
        "But you found me not because one of the guys gave me away, but I was drunk and was wandering around the town. Not quite smart, I know. I had't been very smart since I was a kid. But I'm strong. Let's see who's who.",
      detective:
        'Where there are three times, there is a fourth one. All your buddies have already been detained and at the same moment are testifying against each other.'
    }
  ],
  dialogueOrder: 'downTop',
  dashboardTheme: 'sunset-street'
};
