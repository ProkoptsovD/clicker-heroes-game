import { WebComponent } from '/src/lib/WebComponent.js';

export class Preloader extends WebComponent {
  static tag = 'preloader-screen';

  constructor(config) {
    super(config);
  }

  render() {
    this.innerHTML = `
        <div class="preloader-screen">
            <div class="police-flasher">
                <div class="police-flasher__light police-flasher__light--red"></div>
                <div class="police-flasher__middle-bar"></div>
                <div class="police-flasher__light police-flasher__light--blue"></div>
            </div>
        </div>
    `;
  }
}

customElements.define('preloader-screen', Preloader);
