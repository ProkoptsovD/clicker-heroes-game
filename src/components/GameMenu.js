import { WebComponent } from '../lib/WebComponent.js';
import { SET_ACTIVE_MENU_TAB } from '../store/actions.js';

export class GameMenu extends WebComponent {
  static tag = 'game-menu';

  constructor({ items, previews, ...restConfig } = {}) {
    super(restConfig);

    this.items = items;
    this.previews = previews;
  }

  connectedCallback() {
    // get items list from DOM attribute
    this.items = this.getAttribute('items');
    this.items = this._convertStringArrayIntoArray(this.items);

    //get previews images from DOM attribute
    this.previews = this.getAttribute('previews');
    this.previews = this._convertStringArrayIntoArray(this.previews);

    // maping CSS style classes for preview frames of menu buttons
    this.cssClassesMap = this.items.map((_, idx) => `frame${idx}`);

    // subscribing for events
    this.addEventListener('click', this.onclick);
    this.addEventListener('mouseover', this.onmouseover);

    this.render();
    this.getRefs();
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onclick);
    this.removeEventListener('mouseover', this.onmouseover);
  }

  getRefs() {
    this.ulRef = this.querySelector('.game-menu__list');
    this.tabs = [...(this.querySelectorAll('[data-tab') ?? [])];
  }

  onmouseover({ target }) {
    const { tab } = target.dataset;
    const { activeTab } = this.store.getState();

    if (!tab || tab === activeTab) return;

    this.store.dispatch({ type: SET_ACTIVE_MENU_TAB, payload: { activeTab: tab } });
  }

  onclick({ target }) {
    const { tab } = target.dataset;

    if (tab) {
      const { activeTab } = this.store.getState();
      // prevents from unnecessary rerender if we clicked the same tab
      if (activeTab === tab) return;

      // othrewise dispatch action
      this.store.dispatch({
        type: SET_ACTIVE_MENU_TAB,
        payload: {
          activeTab: tab
        }
      });
    }
  }

  render() {
    const { activeTab } = this.store.getState();

    this.innerHTML = `
        <div class="game-menu">
            <div class="game-menu__side game-menu__side--left">

            <ul class="game-menu__list">
                ${this.items
                  .map((item, idx) => {
                    const isActive = activeTab === idx.toString();
                    const className = isActive ? 'menu-button--active' : '';

                    return `<li class="game-menu__list-item">
                        <button type="button" data-tab="${idx}" class="menu-button ${className}">${item}</button>
                      </li>`;
                  })
                  .join('')}
                </ul>
            </div>
            <div class="game-menu__side game-menu__side--right">
              <div class="game-menu__frame-wrapper ${this.cssClassesMap[activeTab]}">
                <div class="game-menu__item-preview-frame">
                  <img
                    class="preview__mask"
                    src=${this.previews[activeTab]}
                    alt="menu tab #${activeTab} preview"
                  />
                </div>

                <img
                  class="preview"
                  src=${this.previews[activeTab]}
                  alt="menu tab #${activeTab} preview 2"
                />
              </div>
            </div>
        </div>
    `;
  }
}

customElements.define('game-menu', GameMenu);
