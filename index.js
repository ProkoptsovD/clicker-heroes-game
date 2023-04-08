/**
 * It is IMPORTANT all custom components that are used
 * must be at IMPORTED, othrewise they won't be rendered
 */
import { GameMenu } from './src/components/gameMenu.js';
import { HomeScreen } from './src/components/HomeScreen.js';

// consts
import { menuPreviews } from './src/constants/menuPreviews.js';

document.body.appendChild(
  new HomeScreen({
    childrenElements: [
      {
        tag: GameMenu.tag,
        props: {
          items: ['Story', 'Settings', 'Credits', 'Quit'],
          previews: menuPreviews
        }
      }
    ]
  })
);
