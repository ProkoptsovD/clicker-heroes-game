import { WebComponent } from '../lib/WebComponent.js';

const state = {
  activeTab: '0'
};

export class GameMenu extends WebComponent {
  static tag = 'game-menu';

  constructor({ items, previews, ...restConfig } = {}) {
    super(restConfig);

    this.items = items;
    this.previews = previews;
  }

  connectedCallback() {
    // get items list from DOM
    this.items = this.getAttribute('items');
    this.items = this._convertStringArrayIntoArray(this.items);
    this.previews = this.getAttribute('previews');
    this.previews = this._convertStringArrayIntoArray(this.previews);

    this.cssClassesMap = this.items.map((_, idx) => `frame${idx}`);

    this.render();
    this.getRefs();
    this.ulRef.addEventListener('mousemove', this.onMouseOver);
  }

  disconnectedCallback() {
    this.ulRef.addEventListener('mousemove', this.onMouseOver);
  }

  getRefs() {
    this.ulRef = this.querySelector('.game-menu__list');
    this.tabs = [...(this.querySelectorAll('[data-tab') ?? [])];
  }

  onMouseOver({ target }) {
    if (this.tabs) {
      this.tabs.forEach((tabRef) =>
        tabRef.classList[tabRef === target ? 'add' : 'remove']('menu-button--active')
      );
    }
  }

  onClick({ target }) {
    const { tab } = target.dataset;

    state.activeTab = tab;
  }

  render() {
    this.innerHTML = `
        <div class="game-menu">
            <div class="game-menu__side game-menu__side--left">

            <ul class="game-menu__list">
                ${this.items
                  .map((item, idx) => {
                    const isActive = state.activeTab === idx.toString();
                    const className = isActive ? 'menu-button--active' : '';

                    return `<li class="game-menu__list-item">
                        <button type="button" data-tab="${idx}" class="menu-button ${className}">${item}</button>
                      </li>`;
                  })
                  .join('')}
                </ul>
            </div>
            <div class="game-menu__side game-menu__side--right">
              <div class="game-menu__frame-wrapper ${this.cssClassesMap[state.activeTab]}">
                <div class="game-menu__item-preview-frame">
                  <img
                    class="preview__mask"
                    src=${this.previews[state.activeTab]}
                    alt="menu tab #${state.activeTab} preview"
                  />
                </div>

                <img
                  class="preview"
                  src=${this.previews[state.activeTab]}
                  alt="menu tab #${state.activeTab} preview 2"
                />
              </div>
            </div>
        </div>
    `;
  }
}

customElements.define('game-menu', GameMenu);
