/**
 * It is IMPORTANT all custom components that are used
 * must be at IMPORTED, othrewise they won't be rendered
 */
import { Level } from './src/components/Level.js';
import { Game } from './src/components/Game.js';
import { store } from './src/store/store.js';
import { HomeScreen } from './src/components/HomeScreen.js';
import { GameMenu } from './src/components/GameMenu.js';
import { menuPreviews } from './src/constants/menuPreviews.js';

import * as APP_KEYS from './src/constants/appKeys.js';

// characters
import { TonyArcado } from './src/components/characters/TonyArcado.js';
import { BellaMorello } from './src/components/characters/BellaMorello.js';
import { SalvatoreVitale } from './src/components/characters/SalvatoreVitale.js';
import { DominicDasher } from './src/components/characters/DominicDasher.js';
import { AlfredoRossi } from './src/components/characters/AlfredoRossi.js';

import { IntroScene } from './src/components/scenes/IntroScene.js';

// internal
import { localStorageService } from './src/services/storageService.js';
import { HYDRATE_STORE } from './src/store/actions.js';

const user = localStorageService.load(APP_KEYS.LOCAL_STORAGE_KEYS.USER);
const score = localStorageService.load(APP_KEYS.LOCAL_STORAGE_KEYS.SCORE);

store.dispatch({ type: HYDRATE_STORE, payload: { user, score } });

const { characterName } = store.getState().user;

const root = document.querySelector('#root');
window.addEventListener('gameIsOver', (e) => {
  root.innerHTML = '';
  root.appendChild(
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
});

const intro = new IntroScene({
  playerName: characterName,
  onIntroEnd: () => {
    root.innerHTML = '';
    game.start();
  }
});

const levels = {
  1: new Level({ enemy: TonyArcado }),
  2: new Level({ enemy: BellaMorello }),
  3: new Level({ enemy: SalvatoreVitale }),
  4: new Level({ enemy: DominicDasher }),
  5: new Level({ enemy: AlfredoRossi })
};

const game = new Game({ root, levels, store, intro, localStorageService });

game.playIntroScene();
// root.appendChild(
//   new IntroScene({
//     playerName: characterName,
//     onIntroEnd: () => {
//       root.innerHTML = '';
//       game.start();
//     }
//   })
// );

// root.appendChild(
//   new HomeScreen({
//     childrenElements: [
//       {
//         tag: GameMenu.tag,
//         props: {
//           items: ['Story', 'Settings', 'Credits', 'Quit'],
//           previews: menuPreviews
//         }
//       }
//     ]
//   })
// );
