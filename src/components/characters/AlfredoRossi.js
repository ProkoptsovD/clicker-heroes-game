import { Enemy } from '../../lib/Enemy.js';

export const AlfredoRossi = new Enemy({
  name: 'Alfredo Rossi',
  nickname: 'Big Al',
  stamina: 100,
  level: 5,
  className: 'alfredoRossi',
  appearence: '/src/assets/icons/characters/gang_character_05_bar.svg',
  location: '/src/assets/icons/locations/bar.svg',
  phrases: { intro: 'You made a silly choice.', isArrested: "I'll get out of jail and kill you" },
  dialogues: [
    {
      enemy: 'And here goes the detective, {{name}}! Please, sit down. Do me a favour.',
      detective: "Thank you, Big Al. But we're not at a friendly get-together."
    },
    {
      enemy:
        "How rude! Big Al. Now one calls me Big Al until I allow them. I'm Alfredo Rossi, remembere that. But still we may get along. I propose to turn a blind eye to the fact that you saw me here. In return, you'll get a lot of money. It'll be a nice pension supplement. You're retiring in a few weeks, aren't you?  If you agree, you'll be warming old bones on the ocean with a hottie on your lap. If you refuse, you'll be feeding worms in damp ground, where no one will ever keep you warm again.",
      detective:
        "The suggestion is a good one, a fair one. And anyone in my place would agree. However, I like to go to sleep and wake up with a clear conscience. So my answer is no. Let's begin"
    }
  ],
  dashboardTheme: 'bar'
});
