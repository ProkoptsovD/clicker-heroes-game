/**
 * It is IMPORTANT all custom components that are used
 * must be at IMPORTED, othrewise they won't be rendered
 */
import { Level } from './src/components/Level.js';
import { Game } from './src/components/Game.js';
import { store } from './src/store/store.js';

// characters
import { TonyArcado } from './src/components/characters/TonyArcado.js';
import { BellaMorello } from './src/components/characters/BellaMorello.js';
import { SalvatoreVitale } from './src/components/characters/SalvatoreVitale.js';
import { DominicDasher } from './src/components/characters/DominicDasher.js';
import { AlfredoRossi } from './src/components/characters/AlfredoRossi.js';

// internal
import { localStorageService } from './src/services/storageService.js';

const root = document.querySelector('#root');

const levels = {
  1: new Level({ enemy: TonyArcado }),
  2: new Level({ enemy: BellaMorello }),
  3: new Level({ enemy: SalvatoreVitale }),
  4: new Level({ enemy: DominicDasher }),
  5: new Level({ enemy: AlfredoRossi })
};

const game = new Game({ root, levels, store, localStorageService });

game.play();

function initApp() {
  // rootContainer.appendChild(new SignUpForm());
  // rootContainer.appendChild(
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
}

initApp();
