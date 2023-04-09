import { WebComponent } from '/src/lib/WebComponent.js';

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
            <img class="logo" src="/src/assets/images/logo.png" alt="logo" />
            <img class="logo__edition" src="/src/assets/images/edition.png" alt="edition logo" />
        </div>
    `;
  }
}

customElements.define('app-logo', Logo);
