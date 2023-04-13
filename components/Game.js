import { RESET_LEVEL, SET_TOTAL_SCORE } from '../store/actions.js';
import { Level } from './Level.js';
import { Modal } from './Modal.js';
import * as APP_KEYS from '../constants/appKeys.js';
import { Enemy } from '../lib/Enemy.js';

/**
 * game class. Once instanciatied - game begins
 */
export class Game {
  /**
   * @param {{
   *    root: HTMLElement;
   *    levels: { [key: number]: Level };
   *    intro: WebComponent;
   *    store: {
   *        getState: () => Object;
   *        dispatch: ({ type: string; payload?: Object }) => void;
   *        subscribe: (() => void) => void;
   *     };
   *    localStorageService: Record<{
   *        save: (key: string; value: unknown) => void;
   *        load: (key: string) => undefined | unknown'
   *     }>
   * }} config
   */
  constructor({ root, levels, store, intro, localStorageService } = {}) {
    this.root = root;
    this.store = store;
    this.levels = levels;
    this.intro = intro;
    this.startLevel = this.store.getState().level;
    this.localStorageService = localStorageService;
    this.levelsQuantity = Object.keys(this.levels).length;
    this.endGameEvent = new Event('gameIsOver', { bubbles: true });

    this.init();
  }
  init() {
    /**
     * creates and configs modal
     */
    this.modal = new Modal({
      onButtonClick: this.nextLevel.bind(this),
      withConfetti: true
    });
    // /**
    //  * creates and configs modal on game is won
    //  */
    // this.wonGameModal = new Modal({
    //   onButtonClick: () => this.remove(),
    //   withConfetti: true,
    //   text: 'You have won this game. All the criminals are in jail. Good job'
    // });

    /**
     * listens to level pass event in oreder to be able play nex round
     */
    document.addEventListener('levelpassed', ({ detail: delay }) => {
      /**
       * due to animations we need to wait them end
       * I know there is a possibility to listen to animation end
       * but in this case it seems to me better to dispatch custom event
       * containing needed delay
       * */
      setTimeout(() => {
        const { level } = this.store.getState();

        if (level === this.levelsQuantity + 1) {
          this.modal = new Modal({
            onButtonClick: () => this.end(),
            withConfetti: true,
            text: 'You have won this game. All the criminals are in jail. Good job',
            buttonText: 'HOME'
          });
        }

        this.root.appendChild(this.modal);
      }, delay);
    });

    const totalScore = this.localStorageService.load(APP_KEYS.LOCAL_STORAGE_KEYS.SCORE) ?? 0;
    this.store.dispatch({ type: SET_TOTAL_SCORE, payload: { totalScore } });
  }

  /** starts game from begin */
  start() {
    const level = new Level({ enemy: new Enemy(this.levels[this.startLevel]) });
    this.root.appendChild(level);
  }

  /** pushes player to next game level */
  nextLevel() {
    const { level } = this.store.getState();
    this.root.innerHTML = '';
    const nextLevel = new Level({ enemy: new Enemy(this.levels[level]) });
    this.root.appendChild(nextLevel);
  }

  /** ends game */
  end() {
    this.store.dispatch({ type: RESET_LEVEL });
    this.root.dispatchEvent(this.endGameEvent);
  }

  /** plays intro scene */
  playIntroScene() {
    this.root.appendChild(this.intro);
  }
}
