/**
 * It is IMPORTANT all custom components that are used
 * must be at IMPORTED, othrewise they won't be rendered
 */
import { Preloader } from './src/components/Preloader.js';
import { GameMenu } from './src/components/gameMenu.js';
import { HomeScreen } from './src/components/HomeScreen.js';

// consts
import { menuPreviews } from './src/constants/menuPreviews.js';

import { store } from './src/store/store.js';

const rootContainer = document.querySelector('#root');

function initApp() {
  rootContainer.appendChild(
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
}

initApp();
