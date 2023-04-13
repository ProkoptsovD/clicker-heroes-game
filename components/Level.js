// web components
import { WebComponent } from '../lib/WebComponent.js';
import { DashboardPanel } from './panels/DashboardPanel.js';
import { DialoguePanel } from './panels/DialoguePanel.js';

// classes, not web component
import { Enemy } from '../lib/Enemy.js';
import { BASE_URL } from '../constants/config.js';

// actions
import { DECREMENT_STAMINA, NEXT_LEVEL, SET_STAMINA } from '../store/actions.js';

/**
 * creates game level
 */
export class Level extends WebComponent {
  static tag = 'app-level';

  /**
   * @param {{ enemy: Enemy; }} config
   */
  constructor({ enemy, dashboard, dialoguePanel, controlsPanel } = {}) {
    super({ addSubscription: false });

    this.enemy = enemy;
    this.dialoguePanel = dialoguePanel ?? this.createDefaultDialoguePanel();
    this.controlsPanel = controlsPanel;
    this.event = new CustomEvent('levelpassed', { bubbles: true, detail: 2500 });
    this.END_LEVEL_DELAY = 1500;

    this.dashboard = dashboard ?? new DashboardPanel();
  }

  enableEnemyClick() {
    /** enables showing damage on click */
    this.enemy.clickEnabled = true;
    /**
     * provide enemy with onClick func containing outer logic
     * an attempt to implement SOLID =)
     */
    this.enemy.onClick = () => {
      const { stamina } = this.store.getState();

      /** once there is no stamina left */
      if (stamina === 0) {
        /** disable the ability to click on enemy */
        this.enemy.destroyClickListener();

        /** go to next level */
        this.store.dispatch({ type: NEXT_LEVEL });

        return this.endLevel();
      }

      if (stamina === this.enemy.stamina - 1) this.enemy.removeSpeechFrameFromDom();

      /** decrements stamina on enemey click */
      this.store.dispatch({ type: DECREMENT_STAMINA, payload: { stamina: stamina - 1 } });
    };
  }

  connectedCallback() {
    this.render();

    this.getRefs();

    /** add enemy to level map */
    this.enemy.addToDOM(this.enemyContainerRef);
    this.dialogueContainerRef.appendChild(this.dialoguePanel);

    /**
     * setting to store initial stamina amount according to enemy
     * because every enemy has it's own amount os stamina points
     */
    this.store.dispatch({ type: SET_STAMINA, payload: { stamina: +this.enemy.stamina } });
  }

  disconnectedCallback() {
    clearTimeout(this.endLevelTimeoutID);
  }

  getRefs() {
    this.levelContainerRef = this.querySelector('[data-level]');
    this.enemyContainerRef = this.querySelector('[data-enemy-container]');
    this.dialogueContainerRef = this.querySelector('[data-dialogue-panel]');
  }

  /** start playing level on dialogues end */
  playLevel() {
    this.levelContainerRef.classList.add('play');
    this.enemy.domElement.classList.add('start-detention');
    this.enemy.saySpeech('intro');
    this.enableEnemyClick();
  }

  /** dispatches event that tells level is passed */
  endLevel() {
    this.enemy.saySpeech('isArrested');

    this.endLevelTimeoutID = setTimeout(() => {
      this.playArrestedAnimation();
      this.dispatchEvent(this.event);
    }, this.END_LEVEL_DELAY);
  }

  /**
   * create dafault dialogue
   * if any other dialogue in not provided
   */
  createDefaultDialoguePanel() {
    const playerName = this.store.getState().user?.characterName;

    return new DialoguePanel({
      firstSpeakerIcon: this.enemy.miniIcon,
      secondSpeakerIcon: BASE_URL + '/assets/images/character-icons/main_hero_icon_01.png',
      dialogue: this.enemy.dialogues,
      dialogueOrder: this.enemy.dialogueOrder,
      dialogueKeys: { first: 'enemy', second: 'detective' },
      playerName,
      onDialogueEnd: () => this.playLevel()
    });
  }

  /** creates and shows end level animation once the level is passed */
  playArrestedAnimation() {
    const img = document.createElement('img');

    img.src = BASE_URL + '/assets/images/arrested.png';
    img.alt = 'arrested icon';
    img.classList.add('arrested');

    this.enemyContainerRef.appendChild(img);
  }

  /** creates object with props for default dashboard  */
  _mapDashboardProps() {
    const { stamina, name, nickname, dashboardTheme, miniIcon } = this.enemy;

    return {
      tag: this.dashboard.tag,
      props: {
        characterIcon: miniIcon,
        enemyName: name,
        enemyNickname: nickname,
        theme: dashboardTheme,
        stamina
      }
    };
  }

  render() {
    // config dashboard
    const props = this._mapDashboardProps();
    const dashboard = this._transformIntoTag(props);

    this.innerHTML = `
        <section data-level class="level">
            <header class="level__header">
                <div data-dashboard-panel class="level__top-dashboard-wrapper hidden">
                    ${dashboard}
                </div>
            </header>
            
            <div data-enemy-container class="level__enemy-container">
              <div class="level__enemy-container-bg bg level--${this.enemy.level}" style="background-image: url('${this.enemy.location}')"></div>
            </div>
            
            <footer class="level__footer">
                <div data-dialogue-panel class="level__footer-dialogue-wrapper"></div>
                <p class="level__footer-action-tip">Click on the ${this.enemy.name} to arrest</p>
            </footer>
        </section>
    `;
  }
}

customElements.define(Level.tag, Level);
