import { SET_TOTAL_SCORE } from '../store/actions.js';
import { Level } from './Level.js';
import { Modal } from './Modal.js';
import * as APP_KEYS from '../constants/appKeys.js';

/**
 * game class. Once instanciatied - game begins
 */
export class Game {
  /**
   * @param {{
   *    root: HTMLElement;
   *    levels: Array<{ [key: number]: Level }>;
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
  constructor({ root, levels, store, localStorageService } = {}) {
    this.root = root;
    this.store = store;
    this.levels = levels;
    this.startLevel = this.store.getState().level;
    this.localStorageService = localStorageService;

    this.init();
  }
  init() {
    /**
     * creates and configs modal on level pass
     */
    this.modal = new Modal({
      onButtonClick: this.nextLevel.bind(this),
      withConfetti: true
    });

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
      setTimeout(() => this.root.appendChild(this.modal), delay);
    });

    const totalScore = this.localStorageService.load(APP_KEYS.LOCAL_STORAGE_KEYS.SCORE) ?? 0;
    this.store.dispatch({ type: SET_TOTAL_SCORE, payload: { totalScore } });
  }

  play() {
    this.root.appendChild(this.levels[this.startLevel]);
  }

  nextLevel() {
    const { level, totalScore } = this.store.getState();
    this.root.innerHTML = '';
    this.root.appendChild(this.levels[level]);
    this.localStorageService.save(APP_KEYS.LOCAL_STORAGE_KEYS.SCORE, totalScore);
  }

  playIntroScene() {}
  playOutroScene() {}
}
