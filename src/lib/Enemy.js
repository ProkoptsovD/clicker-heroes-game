/**
 * Base class for enemy
 * from this one every enemy will inherit shared features
 */
export class Enemy {
  /**
   *  Enemy class config
   * @param {{
   *  name: string;
   *  stamina: number;
   *  appearence: string;
   *  level: number;
   *  className: string;
   *  size: {
   *    width: string,
   *    height: string
   * };
   *  phrases: {
   *    intro: string,
   *    isArrested: string;
   *  }
   * }} config
   */
  constructor({
    name = 'Enemy',
    stamina = 10,
    level = 1,
    appearence = '/src/assets/icons/characters/gang_character_01_bank.svg',
    size = { width: '200px', height: 'auto' },
    className = 'enemy',
    phrases = { intro: 'Hi', isArrested: "I'm arrested" }
  } = {}) {
    this.name = name;
    this.stamina = stamina;
    this.level = level;
    this.size = size;
    this.phrases = phrases;
    this.appearence = appearence;
    this.className = className;
    this.speechFrames = {
      intro: '/src/assets/icons/speech/speech_frame_05.svg',
      isArrested: '/src/assets/icons/speech/speech_frame_03.svg'
    };
    this.killDamageIn = 1100;

    this.create();

    // debug
    window.enemy = this;
  }

  // creates enemy
  create() {
    const enemyContainer = document.createElement('div');
    const enemy = document.createElement('img');

    // container config
    enemyContainer.style.width = this.size.width;
    enemyContainer.style.height = this.size.height;
    enemyContainer.classList = this.className;

    // enemy config
    enemy.alt = this.name;
    enemy.src = this.appearence;

    enemyContainer.appendChild(enemy);
    this.domElement = enemyContainer;

    this.createSpeechFrames();
    this.createDamageIndicator();
  }

  // creates frames with speech text
  createSpeechFrames() {
    this.speechFrameElements = Object.entries(this.speechFrames).reduce((acc, [key, frame]) => {
      const el = document.createElement('div');
      const paragraph = document.createElement('p');

      // config wpapper element
      el.classList = `frame frame__${this.level}--${key}`;
      el.style.backgroundImage = `url(${frame})`;

      // config text element
      paragraph.classList = 'frame__text';
      paragraph.textContent = this.phrases[key];

      el.appendChild(paragraph);

      return { ...acc, [key]: el };
    }, {});
  }

  /**
   * creates hit indicator like red -1 bubbling up
   * @returns {HTMLElement}
   */
  createDamageIndicator() {
    const damage = document.createElement('span');

    damage.textContent = '-1';
    damage.classList = 'damage';

    return damage;
  }

  /**
   * adds created enemy to DOM
   * @param {HTMLElement} containerEl // node
   * @returns {void}
   */
  addToDOM(containerEl) {
    if (!containerEl) throw new Error('Container element is not provided');
    if (!this.domElement) throw new Error('Please, create enemy first');

    containerEl.appendChild(this.domElement);
  }

  // removes already rendered frames from DOM
  removeSpeechFrameFromDom() {
    Object.values(this.speechFrameElements).forEach((el) => {
      if (this.domElement.contains(el)) this.domElement.removeChild(el);
    });
  }

  /**
   * inserts to DOM frame with text
   * @param {'intro' | 'isArrested'} key // key of object with speech text
   */
  saySpeech(key) {
    // remove previous frames first
    this.removeSpeechFrameFromDom();

    if (!(key in this.speechFrameElements)) throw new Error('Invalid key for speech frame');

    // add needed frame
    this.domElement.appendChild(this.speechFrameElements[key]);
  }

  showDamage() {
    const damageIndicator = this.createDamageIndicator();

    this.domElement.appendChild(damageIndicator);

    this.timeoutID = setTimeout(
      () => this.domElement.removeChild(damageIndicator),
      this.killDamageIn
    );
  }
}
