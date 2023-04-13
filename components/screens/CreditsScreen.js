import { WebComponent } from '../../lib/WebComponent.js';
import { credits } from '../../constants/credits.js';

/**
 * Screens with all resources links
 * that have been used in this project
 * all resources are free to use, but require attribution
 * one more time thanks for creating free of charge assets
 */
export class CreditsScreen extends WebComponent {
  static tag = 'app-credits';

  /**
   * @param {{
   *  creditsList: Array<string>;
   *  onBacklinkClick: () => void;
   * }} config
   */
  constructor({ creditsList = credits, onBacklinkClick, ...props } = {}) {
    super({ addSubscription: false, ...props });

    this.creditsList = creditsList;
    this.onBacklinkClick = onBacklinkClick;
  }

  connectedCallback() {
    this.render();

    this.getRefs();
    this.backlinkRef.addEventListener('click', this.onBacklinkClick);
  }

  disconnectedCallback() {
    this.backlinkRef.removeEventListener('click', this.onBacklinkClick);
  }

  getRefs() {
    this.backlinkRef = this.querySelector('[data-backlink]');
  }

  render() {
    this.innerHTML = `
        <section class="credits">
            <div class="credits__bg">
              <h1 class="credits__title">Credits</h1>
              <div class="credits__content-wrapper">
                  <div class="credits__content-wrapper-inner">
                    <p>Thanks all for free assets!!!</p>
                    <button data-backlink type="button" class="credits__backlink-button">Back to menu</button>
                  </div>
                  <div class="credits__list-wrapper">
                    <ul class="credits__list">
                      ${this.creditsList
                        .map(
                          (item) => `
                          <li>${item}</li>
                      `
                        )
                        .join('')}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
        </section>
    `;
  }
}

customElements.define(CreditsScreen.tag, CreditsScreen);
