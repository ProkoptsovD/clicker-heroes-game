import { WebComponent } from '../../lib/WebComponent.js';
import { Logo } from '../Logo.js';
import { GameMenu } from '../panels/GameMenu.js';

//** CONSTANTS */
import { menuPreviews } from '../../constants/menuPreviews.js';
import { menuTabs } from '../../constants/menuTabs.js';

/** app home screen with navigation */
export class HomeScreen extends WebComponent {
  static tag = 'home-screen';

  constructor(config) {
    /**
     * we don't want this componnent to rerender on store value changes
     * so here we cancel the auto subscription which is implelemted on parent class
     */
    super({ addSubscription: false, ...config });

    this.gameMenu = new GameMenu({
      items: menuTabs,
      previews: menuPreviews
    });
  }

  connectedCallback() {
    this.render();
    this.getRefs();

    this.contentContainerRef.appendChild(this.gameMenu);
  }

  getRefs() {
    this.contentContainerRef = this.querySelector('[data-home-content-container]');
  }

  render() {
    this.innerHTML = `
      <section class="main-screen">
        <div class="container main-screen__container">
            <app-logo></app-logo>
            <div data-home-content-container class="main-screen__content-holder"></div>
            <div class="main-screen__bg-container"></div>
        </div>
      </section>`;
  }
}

customElements.define(HomeScreen.tag, HomeScreen);
