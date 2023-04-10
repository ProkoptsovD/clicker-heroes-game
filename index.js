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
import { SignUpForm } from './src/components/SignUpForm.js';
import { Enemy } from './src/lib/Enemy.js';

const rootContainer = document.querySelector('#root');
// const enemy = new Enemy({
//   phrases: {
//     intro: "Hi, Ventura! You think you can get me? Let's try!!!",
//     isArrested: "Noooooooo! I can't believe you have caught me...."
//   }
// });

function initApp() {
  enemy.addToDOM(rootContainer);
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
