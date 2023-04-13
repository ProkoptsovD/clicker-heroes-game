import { BASE_URL } from '../config.js';

export const AlfredoRossi = {
  name: 'Alfredo Rossi',
  nickname: 'Big Al',
  stamina: 5,
  level: 5,
  className: 'alfredoRossi',
  appearence: BASE_URL + '/assets/icons/characters/gang_character_05_bar.svg',
  location: BASE_URL + '/assets/icons/locations/bar.svg',
  miniIcon: BASE_URL + '/assets/images/character-icons/gang_character_icon_05.png',
  phrases: {
    intro: 'You made a silly choice!',
    isArrested: "I'll get out of jail and kill you..."
  },
  dialogues: [
    {
      enemy: 'And here goes the detective {{name}}! Please, sit down. Do me a favour.',
      detective: "Thank you, Big Al. But we're not at a friendly get-together."
    },
    {
      enemy:
        "How rude! Big Al. Now one calls me Big Al until I allow them. I'm Alfredo Rossi, remembere that.",
      detective:
        "I will. And you'd better to remember I don't care about how the criminals call themselves."
    },
    {
      enemy:
        "I'd pretend I didn't hear that. But still we may get along. I propose to turn a blind eye to the fact that you saw me here. In return, you'll get a lot of money.",
      detective: "Money is a bullshit. I'm not interested in that."
    },
    {
      enemy:
        "Come on! It's greate pension supplement. You're retiring in a few weeks, aren't you? With that money you'll be warming the old bones on the ocean with a hottie on your lap.",
      detective: "I don't like sea, and the hotties are not like they used to be."
    },
    {
      enemy:
        "As you like. You'll be feeding worms in damp ground, where no one will ever keep you warm again.",
      detective: "That's not being part of my plans for today."
    }
  ],
  dashboardTheme: 'bar'
};
