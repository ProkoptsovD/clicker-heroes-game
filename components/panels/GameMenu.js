import { WebComponent } from '../../lib/WebComponent.js';
import { SET_ACTIVE_MENU_TAB } from '../../store/actions.js';

/** game menu panel with navigation */
export class GameMenu extends WebComponent {
  static tag = 'game-menu';

  constructor({ items, previews, ...restConfig } = {}) {
    super(restConfig);

    this.items = items;
    this.previews = previews;
  }

  connectedCallback() {
    // maping CSS style classes for preview frames of menu buttons
    this.cssClassesMap = this.items.map((_, idx) => `frame${idx}`);

    // subscribing for events
    this.addEventListener('click', this.onclick);
    this.addEventListener('mouseover', this.onmouseover);

    this.render();
    this.#getRefs();
    this.#bindTabEventsOnClick();
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onclick);
    this.removeEventListener('mouseover', this.onmouseover);
    this.tabs?.forEach((tab) => (tab.onclick = undefined));
  }

  #getRefs() {
    this.ulRef = this.querySelector('[data-game-menu-tablist]');
    this.tabs = [...(this.querySelectorAll('[data-tab') ?? [])];
  }

  /**
   * switches image next to tab
   */
  onmouseover({ target }) {
    const { tab } = target.dataset;
    const { activeTab } = this.store.getState();

    if (!tab || tab === activeTab) return;

    this.store.dispatch({ type: SET_ACTIVE_MENU_TAB, payload: { activeTab: tab } });
  }

  /**
   * selects menu tab
   */
  onclick({ target }) {
    const { tab } = target.dataset;

    if (tab) {
      const { activeTab } = this.store.getState();
      // prevents from unnecessary rerender if we clicked the same tab
      if (activeTab === tab) return;

      // othrewise dispatch action
      this.store.dispatch({
        type: SET_ACTIVE_MENU_TAB,
        payload: { activeTab: tab }
      });
    }
  }

  #bindTabEventsOnClick() {
    this.tabs.forEach((tab) => {
      const evt = new CustomEvent('switch-tab', { bubbles: true, detail: tab.id });
      tab.onclick = () => tab.dispatchEvent(evt);
    });
  }

  render() {
    const { activeTab, totalScore } = this.store.getState();

    this.innerHTML = `
        <div class="game-menu">
            <div class="game-menu__side game-menu__side--left">

            <ul data-game-menu-tablist class="game-menu__list">
                ${this.items
                  .map((item, idx) => {
                    const isActive = activeTab === idx.toString();
                    const className = isActive ? 'menu-button--active' : '';

                    return `<li class="game-menu__list-item">
                        <button type="button" data-tab="${idx}" id="${item}" class="menu-button ${className}">${item}</button>
                      </li>`;
                  })
                  .join('')}
                </ul>
            </div>
            <div class="game-menu__side game-menu__side--right">
              <div class="game-menu__frame-wrapper ${this.cssClassesMap[activeTab]}">
               ${
                 this.previews[activeTab]
                   ? `
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
               `
                   : `
                  <div class="game-menu__item-preview-frame">
                    <img
                        class="preview__mask"
                        src=${this.previews[2]}
                        alt="menu tab ${activeTab} preview"
                      >
                  </div>
                  <span class="game-menu__score">
                    ${totalScore} ${totalScore === 1 ? 'point' : 'points'}
                  </span>
               `
               }
                
              </div>
            </div>
        </div>
    `;
  }
}

customElements.define(GameMenu.tag, GameMenu);
