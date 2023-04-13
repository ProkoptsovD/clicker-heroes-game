export const SalvatoreVitale = {
  name: 'Salvatore Vitale',
  nickname: 'Good-looking Sal',
  stamina: 5,
  level: 3,
  className: 'salvatoreVitale',
  appearence: '/assets/icons/characters/gang_character_03_parking.svg',
  location: '/assets/icons/locations/undeground_parking.svg',
  miniIcon: '/assets/images/character-icons/gang_character_icon_03.png',
  phrases: { intro: 'What? Did you shit your pants?', isArrested: 'Oh... poor me...' },
  dialogues: [
    {
      enemy: " What? Officer {{name}}? Didn't expect to see you here. Who gave me up?",
      detective: 'Do you really wanna know that? Are you sure about that? Well, it was...'
    },
    {
      enemy:
        "Shhhhh... Don't tell. Let me guess... It was Fat Dominic, wasn't he? What did you offer him? Pizza? Fried chicken? Or his favorite triple hamburger? That bastard would sell his soul to the devil for a chow.",
      detective:
        "It's much simpler than that. Bella Morello cracked and plead bargain. Now she'll get a little jail time and a new life after she's served her time waits for her. I advise do the same."
    },
    {
      enemy:
        " No way! You know what they do to pretty boys like me in prison. It's better to be killed than arrested.",
      detective: "That's your choice, Salvatore."
    }
  ],
  dashboardTheme: 'parking'
};
