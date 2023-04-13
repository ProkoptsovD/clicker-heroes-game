/** store */
import { store } from './store/store.js';

/** constants */
import * as APP_KEYS from '/src/constants/appKeys.js';
import { levels } from './constants/levels.js';
import { MENU_TABS } from './constants/menuTabs.js';

/** components */
import { Game } from './components/Game.js';
import { IntroScene } from './components/scenes/IntroScene.js';
import { SignUpForm } from './components/SignUpForm.js';
import { HomeScreen } from './components/screens/HomeScreen.js';
import { CreditsScreen } from './components/screens/CreditsScreen.js';

/** actions */
import { HYDRATE_STORE, RESET } from './store/actions.js';

/** services */
import { localStorageService } from './services/storageService.js';

export class App {
  /**
   * @param {string} selector // css selector
   */
  constructor({ selector = '#root' } = {}) {
    this.root = document.querySelector(selector);

    /**
     * necessary context bindings
     */
    this.handleAppNaviation = this.#handleAppNaviation.bind(this);
  }

  init() {
    this.#hydrateStore();

    const playerName = store.getState()?.user?.characterName;

    // instanciate necessary classes
    this.homeScreen = new HomeScreen();
    this.signUpForm = new SignUpForm({ onFormSubmit: this.#render.bind(this, this.homeScreen) });
    this.intro = new IntroScene({ playerName });
    this.game = new Game({
      root: this.root,
      intro: this.intro,
      levels,
      store,
      localStorageService
    });
    this.creditsScreen = new CreditsScreen({
      onBacklinkClick: this.#render.bind(this, this.homeScreen)
    });

    /** setting callback for intro end logic */
    this.intro.onIntroEnd = () => {
      this.#clearRoot();
      // if intro is ended - start playing game
      this.game.start();
    };

    this.#initSubscriptions();
  }

  /**
   * hydrate store with score points
   * but so far it is not binded to curent user
   * that's why if user does not clicked quit tab
   * and registered under another name - the score will be set from previous user
   */
  #hydrateStore() {
    const score = localStorageService.load(APP_KEYS.LOCAL_STORAGE_KEYS.SCORE) ?? 0;
    const user = localStorageService.load(APP_KEYS.LOCAL_STORAGE_KEYS.USER);

    store.dispatch({ type: HYDRATE_STORE, payload: { user, score } });
  }

  #initSubscriptions() {
    /** more bindings here case in constructor some instances are not being created */
    this.renderHomeScreen = this.#render.bind(this, this.homeScreen);
    this.renderSignUpForm = this.#render.bind(this, this.signUpForm);
    this.handleAppLoad = this.#handleAppLoad.bind(this);

    /** renders form only all resources are downloaded, HTML is parsed and DOM tree is build */
    window.addEventListener('load', this.handleAppLoad);

    /** listens to custom events */
    window.addEventListener('gameIsOver', this.renderHomeScreen);
    window.addEventListener('switch-tab', this.handleAppNaviation);
  }

  #handleAppLoad() {
    const { user } = store.getState();

    if (!user) {
      this.this.renderSignUpForm();
    } else {
      this.renderHomeScreen();
    }
  }

  #render(el) {
    this.#clearRoot();
    this.root.appendChild(el);
  }

  #clearRoot() {
    this.root.innerHTML = '';
  }

  /** executes app navigation depending on what tab was clicked */
  #handleAppNaviation({ detail }) {
    switch (detail) {
      case MENU_TABS.STORY:
        this.#clearRoot();
        this.game.playIntroScene();
        break;
      case MENU_TABS.CREDITS:
        this.#render(this.creditsScreen);
        break;
      case MENU_TABS.QUIT:
        store.dispatch({ type: RESET });
        localStorageService.clear();
        this.renderSignUpForm();
        break;
      case MENU_TABS.SCORE:
        return;
      default:
        throw new Error('Unsupported type of event');
    }
  }

  /** cleaning up all listeners */
  unsubsribe() {
    window.addEventListener('load', this.handleAppLoad);
    window.addEventListener('gameIsOver', this.renderHomeScreen);
    window.addEventListener('switch-tab', this.handleAppNaviation);
  }
}
