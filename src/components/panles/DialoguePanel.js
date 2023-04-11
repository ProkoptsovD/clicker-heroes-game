import { WebComponent } from '/src/lib/WebComponent.js';

export class DialoguePanel extends WebComponent {
  static tag = 'app-dialogue-panel';

  /**
   *  config dasboard
   * @param {{
   *  characterIcon: string;
   *  enemyName: string;
   *  enemyNickname: string
   *  theme: string;
   * }} config
   */
  constructor({
    characterIcon,
    stamina,
    totalScore,
    enemyName,
    enemyNickname,
    theme,
    ...config
  } = {}) {
    super({ addSubscription: false, ...config });
  }

  connectedCallback() {
    this.render();

    this.getRefs();
  }

  getRefs() {
    this.totalScoreUIRef = this.querySelector('[data-total-score]');
    this.staminaUIRef = this.querySelector('[data-stamina]');
  }

  render() {
    this.innerHTML = `
        <div class="dialogue-panel">
            <div class="dashboard__enemy-info">
                <div class="dashboard__enemy-info-character-icon">
                    <img src=${this.characterIcon} alt="character icon" />
                </div>
                <div class="dashboard__enemy-info-name-wrapper">
                    <p class="dashboard__enemy-info-character-name">${this.enemyName}</p>
                    <p class="dashboard__enemy-info-character-nickname">${this.enemyNickname}</p>
                </div>
            </div>
            <div class="dashboard__character-stamina-wrapper">
                <strong class="dashboard__character-text">Stamina</strong>
                <div data-stamina class="dashboard__stamina-progress">
                    <div class="dashboard__stamina-progress-fill"></div>
                </div>
            </div>

            <div class="dashboard__total-score">
                <strong class="dashboard__total-score-text">Total score: </strong>
                <span data-total-score class="dashboard__total-score-count">${this.totalScore}</span>
            </div>
        </div>
    `;
  }
}

customElements.define(DialoguePanel.tag, DialoguePanel);
