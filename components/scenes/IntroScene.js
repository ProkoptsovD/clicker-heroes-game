import { WebComponent } from '../../lib/WebComponent.js';

/** intro game scene */
export class IntroScene extends WebComponent {
  static tag = 'app-intro-scene';

  constructor({ playerName, onIntroEnd, ...config } = {}) {
    super({ addSubscription: false, ...config });

    this.tag = IntroScene.tag;
    this.cheifIcon = '/assets/images/character-icons/police_character_icon_01_chief.png';
    this.heroIcon = '/assets/images/character-icons/main_hero_icon_01.png';
    this.playerName = playerName;
    this.frames = {
      1: `
        <section class="scene">
            <div class="scene__vignette scene__vignette--top no-animation"></div>
            <div class="scene__bg-container intro-frame-1" style="background-image: url('/assets/icons/locations/main_hero_01_room.svg')"></div>
            <div class="scene__vignette scene__vignette--bottom no-animation">
                <div class="intro__character-speech delay-1s">
                    <div class="intro__character-icon">
                        <img data-character-icon class="intro__character-icon-image" src="${this.heroIcon}" alt="game hero icon"/>
                    </div>
                    <p data-character-speech class="intro__character-speech-text">
                    It was late at night after a hard day. Filling out reports is tough gig. I drank a lot of coffee and couldn't sleep for a long time. And when I finally fell asleep and suddenly the phone rang.
                    </p>
                </div>
                <button class="intro__next-button" data-next-button type="button">Next</button>

            </div>
        </section>
      `,
      2: `
            <section class="scene">
                <div class="scene__vignette scene__vignette--top">
                    <button data-intro-button class="intro__to-crime-scene-button" type="button">Go to a crime scene</button>
                </div>
                <div class="scene__bg-container" style="background-image: url('/assets/icons/locations/police_department.svg')"></div>
                <div class="scene__vignette scene__vignette--bottom">
                    <img class="intro__character" src="/assets/icons/characters/police_character_01_chief.svg" alt="game charachter"/>
                    <div class="intro__character-speech">
                        <div class="intro__character-icon">
                            <img class="intro__character-icon-image" src="${this.cheifIcon}" alt="game police chief icon"/>
                        </div>
                        <p class="intro__character-speech-text">
                            There you are! I'm tired of waiting for you! Where the hell you have been??? What ever. Here's the thing. Alfredo Rossi with his buddies stole a quarter million dollars. Serious people kept money in that bank. And now they are in a rage. So drop the case as fast as possible, ${this.playerName}!
                        </p>
                    </div>
                </div>
            </section>
    `
    };
    this.onIntroEnd = onIntroEnd;
    this.currentFrame = 1;
    this.currentSpeaker = 0;
    this.speech = {
      1: {
        icon: this.cheifIcon,
        text: `Hey, ${this.playerName}, asleep? No? Good. Get your ass up and get to the station ASAP. We have a robbery here. Big Al and his gang cracked the bank on the corner of Washington and 5th Ave. ASAP, got it?`
      },
      2: {
        icon: this.heroIcon,
        text: "Jesus! And I'm only a few weeks away from retirement. I wish I had studied to be a programmer! Would be working for TechFabric now... Well, here we go..."
      }
    };
  }

  connectedCallback() {
    this.render();

    this.getRefs();
    this.init();
  }

  disconnectedCallback() {
    if (this.toCrimeSceneButtonRef)
      this.toCrimeSceneButtonRef.removeEventListener('click', this.onIntroEnd);

    clearTimeout(this.timeoutID);
  }

  getRefs() {
    this.bgContainerRef = this.querySelector('[data-bg-container]');
    this.toCrimeSceneButtonRef = this.querySelector('[data-intro-button]');
    this.charecterIconRef = this.querySelector('[data-character-icon]');
    this.characterSpeechRef = this.querySelector('[data-character-speech]');
    this.nextButtonRef = this.querySelector('[data-next-button]');
  }

  init() {
    if (this.toCrimeSceneButtonRef)
      this.toCrimeSceneButtonRef.addEventListener('click', this.onIntroEnd);
    if (this.nextButtonRef)
      this.nextButtonRef.addEventListener('click', this.updateSpeaker.bind(this));
  }

  updateSpeaker() {
    this.currentSpeaker += 1;
    if (this.currentSpeaker > Object.keys(this.speech).length) {
      this.currentFrame += 1;
      this.render();
      return this.connectedCallback();
    }
    const { icon, text } = this.speech[this.currentSpeaker];

    this.charecterIconRef.src = icon;
    this.characterSpeechRef.textContent = text;
  }

  render() {
    this.innerHTML = this.frames[this.currentFrame];
  }
}

customElements.define(IntroScene.tag, IntroScene);
