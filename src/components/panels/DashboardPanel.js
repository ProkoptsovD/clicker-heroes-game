import { WebComponent } from '/src/lib/WebComponent.js';

export class DashboardPanel extends WebComponent {
  static tag = 'app-dashboard-panel';

  /**
   *  config dasboard panel
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

    this.tag = DashboardPanel.tag;
    this.characterIcon = characterIcon;
    this.enemyName = enemyName;
    this.enemyNickname = enemyNickname;
    this.theme = theme;

    this.updateScoreUI = this.updateScoreUI.bind(this);
    this.updateStaminaUI = this.updateStaminaUI.bind(this);
  }

  connectedCallback() {
    this.characterIcon = this.getAttribute('characterIcon');
    this.stamina = this.getAttribute('stamina');
    this.enemyName = this.getAttribute('enemyName');
    this.enemyNickname = this.getAttribute('enemyNickname');
    this.theme = this.getAttribute('theme');

    this.render();

    this.getRefs();

    /**
     * get values from store once element is monted
     * because in constructor they do not exist yet
     */
    this.stamina = this.store.getState().stamina;
    this.totalScore = this.store.getState().totalScore;

    // subscribe to store
    this.store.subscribe(this.updateScoreUI);
    this.store.subscribe(this.updateStaminaUI);
  }

  disconnectedCallback() {
    this.store.unsibscribe(this.updateScoreUI);
    this.store.unsibscribe(this.updateStaminaUI);
  }

  getRefs() {
    this.totalScoreUIRef = this.querySelector('[data-total-score]');
    this.staminaUIRef = this.querySelector('[data-stamina]');
  }

  /** updates score count UI */
  updateScoreUI = () => {
    const { totalScore } = this.store.getState();

    this.totalScoreUIRef.textContent = totalScore;
  };

  /** updates stamima amout UI */
  updateStaminaUI() {
    const allStamina = Number(this.getAttribute('stamina'));
    const actualStamina = this.store.getState().stamina;

    this.staminaUIRef.setAttribute('style', `--width: ${(actualStamina * 100) / allStamina}%`);
  }

  render() {
    this.innerHTML = `
        <div class="dashboard ${this.theme}">
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

customElements.define(DashboardPanel.tag, DashboardPanel);
