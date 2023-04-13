import { WebComponent } from '../lib/WebComponent.js';
import { BASE_URL } from '../constants/config.js';

/** game logo */
export class Logo extends WebComponent {
  static tag = 'app-logo';

  constructor(config) {
    super({ addSubscription: false, ...config });

    this.class = '';
  }

  connectedCallback() {
    this.class = this.getAttribute('class');

    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="logo__container ${this.class}">
            <img class="logo" src="${BASE_URL}/assets/images/logo.png" alt="logo" />
            <img class="logo__edition" src="${BASE_URL}/assets/images/edition.png" alt="edition logo" />
        </div>
    `;
  }
}

customElements.define(Logo.tag, Logo);
