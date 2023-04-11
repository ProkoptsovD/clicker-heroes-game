import { Enemy } from '../../lib/Enemy.js';

export const SalvatoreVitale = new Enemy({
  name: 'Salvatore Vitale',
  nickname: 'Good-looking Sal',
  stamina: 50,
  level: 3,
  className: 'salvatoreVitale',
  appearence: '/src/assets/icons/characters/gang_character_03_parking.svg',
  location: '/src/assets/icons/locations/undeground_parking.svg',
  phrases: { intro: 'What? Did you shit your pants?', isArrested: 'Oh... poor me...' },
  dialogues: [
    {
      enemy:
        " What? Officer {{name}}? Didn't expect to see you here. Who gave me up? Shhhhh... Don't tell. Let me guess... It was Fat Dominic, wasn't he? What did you offer him? Pizza? Fried chicken? Or his favorite triple hamburger? That bastard would sell his soul to the devil for a chow.",
      detective:
        "Though Fat Dominic has a bottomless womb, he did not give you up. It's much simpler than that. Bella Morello cracked and plead bargain. Now she'll get a little jail time and a new life after she's served her time waits for her. I advise you not to resist and do the same. Be reasonable, Good-looking Sal."
    },
    {
      enemy:
        " No way! You know what they do to pretty boys like me in prison. It's better to be killed than arrested.",
      detective: "That's your choice, Salvatore."
    }
  ],
  dashboardTheme: 'parking'
});
