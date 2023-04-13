import { WebComponent } from '../lib/WebComponent.js';
import { Confetti } from '../lib/Confetti.js';

export class Modal extends WebComponent {
  static tag = 'app-modal';

  constructor({
    title = 'Congraulations!',
    text = 'You have detained extremely dangerous criminal!',
    buttonText = 'Next level',
    withConfetti = false,
    bodyContent,
    onButtonClick,
    ...config
  } = {}) {
    super({ addSubscription: false, ...config });

    this.title = title;
    this.text = text;
    this.buttonText = buttonText;
    this.withConfetti = withConfetti;
    this.bodyContent = bodyContent;
    this.onButtonClick = () => onButtonClick();

    this.defaultContentTemplate = `
        <div class="modal-content-container">
            <h3 class="modal__title">${this.title}</h3>
            <p class="modal__text">
                ${this.text}
            </p>
            <p class="modal__text">
                Thank you for your service, detective ${this.store.getState().user?.characterName}.
            </p>
            <button type="button" class="modal__button">${this.buttonText}</button>
        </div>
    `;
  }

  connectedCallback() {
    this.render();

    this.getRefs();

    if (this.withConfetti) this.confetti = new Confetti({ containerRef: this.backdropRef });

    if (this.buttonRef) {
      this.buttonRef.addEventListener('click', this.onButtonClick);
    }
  }

  disconnectedCallback() {
    if (this.buttonRef) {
      this.buttonRef.removeEventListener('click', this.onButtonClick);
    }
  }

  getRefs() {
    this.backdropRef = this.querySelector('.modal__backdrop');
    this.buttonRef = this.querySelector('.modal__button');
  }

  render() {
    this.innerHTML = `
        <div class="modal__backdrop">
            <div class="modal">
                ${this.bodyContent ?? this.defaultContentTemplate}
            </div>
        </div>
    `;
  }
}

customElements.define(Modal.tag, Modal);
