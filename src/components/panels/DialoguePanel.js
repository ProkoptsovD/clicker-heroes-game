import { WebComponent } from '/src/lib/WebComponent.js';

/**
 * plays dialogues between two characters
 */
export class DialoguePanel extends WebComponent {
  static tag = 'app-dialogue-panel';

  /**
   *  config dialoguePanel
   * @param {{
   *  firstSpeakerIcon: string;
   *  secondSpeakerIcon: string;
   *  playerName: string;
   *  dialogue: Array<{ enemy: string; detective: string; }>
   *  dialogueOrder: 'topDown' | 'downTop';
   *  dialogueKeys: { first: string, second: string };
   *  onDialogueEnd: () => void;
   * }} config
   */
  constructor({
    firstSpeakerIcon,
    secondSpeakerIcon,
    playerName,
    dialogue,
    dialogueOrder = 'topDown',
    dialogueKeys = { first: 'enemy', second: 'detective' },
    onDialogueEnd,
    ...config
  } = {}) {
    super({ addSubscription: false, ...config });

    this.tag = DialoguePanel.tag;
    this.firstSpeakerIcon = firstSpeakerIcon;
    this.secondSpeakerIcon = secondSpeakerIcon;
    this.dialogue = dialogue;
    this.dialogueOrder = dialogueOrder;
    this.dialogueKeys = dialogueKeys;
    this.onDialogueEnd = onDialogueEnd;
    this.endDialogue = this.endDialogue.bind(this);

    this.currentDialogue = 0;
    this.lastDialogueIndex = this.dialogue.length - 1;
    this.anchor = '{{name}}';
    this.playerName = playerName;
    this.nextFrame = this.nextFrame.bind(this);

    this.#normalizeDialogueKeys();
  }

  connectedCallback() {
    this.render();

    this.getRefs();

    this.nextButtonRef.addEventListener('click', this.nextFrame);
    this.skipButtonRef.addEventListener('click', this.endDialogue);
  }

  disconnectedCallback() {
    this.nextButtonRef.removeEventListener('click', this.nextFrame);
    this.skipButtonRef.removeEventListener('click', this.endDialogue);
  }

  getRefs() {
    this.totalScoreUIRef = this.querySelector('[data-total-score]');
    this.staminaUIRef = this.querySelector('[data-stamina]');
    this.nextButtonRef = this.querySelector('[data-dialogue-button="next"]');
    this.skipButtonRef = this.querySelector('[data-dialogue-button="skip"]');
  }

  /** shows next dialogue */
  nextFrame() {
    // end dialogue if there are no dialoges left
    if (this.currentDialogue === this.lastDialogueIndex) {
      return this.endDialogue();
    }

    // sets next dialogue
    this.currentDialogue += 1;
    // rerenders component
    this.render();
    // adds all subscriptions and listeners
    this.connectedCallback();

    // once at frist render dialogue wasn't skip remove skip button
    if (this.skipButtonRef) this.skipButtonRef.remove();
  }

  /** ends dialogue */
  endDialogue() {
    this.remove();
    this.onDialogueEnd();
  }

  /**
   * transforms kyes from original dialogue to the ones needed for the template
   * it's done for the reason to be able to pass dialogues with any keys pairs
   */
  #normalizeDialogueKeys() {
    this.dialogue = this.dialogue.map((dialogue) => {
      const { first, second } = this.dialogueKeys;

      return {
        firstSpeakerText: this.#addPlayerNicknameToSpeech(dialogue[first]),
        secondSpeakerText: this.#addPlayerNicknameToSpeech(dialogue[second])
      };
    });
  }

  /**
   * replaces {{name}} anchor in speech with character name user has provided
   * @param {string} name
   */
  #addPlayerNicknameToSpeech(name) {
    return name?.replaceAll(this.anchor, this.playerName);
  }

  /**
   * gets pairs of dialogue to display on screen
   * must be even number of dialogue phrases in dialogue object
   * like { enemy: '', detective: '' } ---> is first pair
   * [{ enemy: '1', detective: '1' }, { enemy: '2', detective: '2' }] ----> there are two pairs of dialogues
   * @param {number} key // array index of dialogue starting from 0, e.g 0 means the first pair
   */
  #getDialoguePair(key) {
    return this.dialogue[key];
  }

  render() {
    const { firstSpeakerText, secondSpeakerText } = this.#getDialoguePair(this.currentDialogue);

    this.innerHTML = `
        <div class="dialogue-panel">
          <div class="dialogue-panel__wrapper ${this.dialogueOrder}">
            <div class="dialogue-panel__speaker dialogue-panel__speaker--one">
              <div class="dialogue-panel__speaker-icon-wrapper">
                <img
                  class="dialogue-panel__speaker-icon"
                  src=${this.firstSpeakerIcon}
                  alt="speaker one icon"
                />
              </div>
              <p class="dialogue-panel__speaker-text">${firstSpeakerText}</p>
            </div>
            <div class="dialogue-panel__speaker dialogue-panel__speaker--two">
              <p class="dialogue-panel__speaker-text">${secondSpeakerText}</p>
              <div class="dialogue-panel__speaker-icon-wrapper">
                <img
                  class="dialogue-panel__speaker-icon"
                  src=${this.secondSpeakerIcon}
                  alt="speaker one icon"
                />
              </div>
            </div>
          </div>

          <div class="dialogue-panel__button-wrapper">
            <button data-dialogue-button="skip" class="dialogue-panel__button" type="button">
              Skip
            </button>
            <button data-dialogue-button="next" class="dialogue-panel__button" type="button">
              ${this.currentDialogue === this.lastDialogueIndex ? 'Arrest' : 'Next'}
            </button>
          </div>
        </div>
    `;
  }
}

customElements.define(DialoguePanel.tag, DialoguePanel);
