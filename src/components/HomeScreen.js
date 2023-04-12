import { WebComponent } from '../lib/WebComponent.js';
import { Logo } from './Logo.js';

/** app home screen with navigatin */
export class HomeScreen extends WebComponent {
  static tag = 'home-screen';
  /**
   * @param {{
   *  childrenElements: Array<{tag: string, props: { items: Array<string>, previews: Array<string> }}> | string | undefined
   *  tag: GameMenu.tag
   * }} config
   */
  constructor({ childrenElements, ...restConfig } = {}) {
    /**
     * we don't want this componnent to rerender on store value changes
     * so here we cancel the auto subscription which is implelemted on parent class
     */
    super({ addSubscription: false, ...restConfig });
    this.childrenElements = childrenElements;
  }

  render() {
    const children = this.childrenElements.map(this._transformIntoTag.bind(this)).join('');

    this.innerHTML = `
        <section class="main-screen">
          <div class="container main-screen__container">
              <app-logo></app-logo>
    
              <div class="main-screen__content-holder">
              ${children}
              </div>

              <div class="main-screen__bg-container"></div>
          </div>
        </section>
`;
  }
}

customElements.define(HomeScreen.tag, HomeScreen);
