import { WebComponent } from '../lib/WebComponent.js';
// import { GameMenu } from './gameMenu.js';

export class HomeScreen extends WebComponent {
  static tag = 'home-screen';
  /**
   * @param {{ childrenElements: Array<string> | string | undefined }} config
   */
  constructor({ childrenElements, instance, ...restConfig } = {}) {
    super(restConfig);

    this.childrenElements = childrenElements[0];
  }

  render() {
    const children = this._transformIntoTag(this.childrenElements);

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

const a = `<h1 class="main-screen__title">
<span class="main-screen__title--text-part">CLICKER HEROES</span>
<span class="main-screen__title--text-part main-screen__title--bottom">Robbery Edition</span>
</h1>`;
