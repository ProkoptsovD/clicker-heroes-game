import { WebComponent } from '../lib/WebComponent.js';

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
              <div class="logo__container">
               <img class="logo" src="/src/assets/images/logo.png" alt="logo" />
               <img class="logo__edition" src="/src/assets/images/edition.png" alt="edition logo" />
              </div>

              <div class="main-screen__content-holder">
              ${children}
              </div>

              <div class="main-screen__bg-container"></div>
          </div>
        </section>
`;
  }
}

customElements.define('home-screen', HomeScreen);
