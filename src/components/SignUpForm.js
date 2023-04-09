import { WebComponent } from '/src/lib/WebComponent.js';
import { Logo } from './Logo.js';

// services
import { validationService } from '../services/ValidationService.js';
import { localStorageService } from '../services/storageService.js';

// keys
import * as APP_KEYS from '/src/constants/appKeys.js';

export class SignUpForm extends WebComponent {
  static tag = 'signup-form';
  static defaultTitle = 'Sign up';
  static defaultButtonText = 'Enter the service';
  static inputNames = {
    userName: 'userName',
    characterName: 'characterName',
    email: 'email'
  };
  static errors = {
    required: "Field mustn't be empty",
    invalid: (value) => `Please, provide valid ${value}`
  };

  constructor({
    validateEmail = validationService.validateEmail.bind(validationService),
    formSubmitHandler = localStorageService.save.bind(localStorageService),
    ...config
  } = {}) {
    super({ addSubscription: false, ...config });

    this.title = SignUpForm.defaultTitle;
    this.buttonText = SignUpForm.defaultButtonText;
    this.validateEmail = validateEmail;
    this.formSubmitHandler = formSubmitHandler;

    this.onBlur = this.onBlur.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  connectedCallback() {
    this.title = this.getAttribute('title') ?? SignUpForm.defaultTitle;
    this.buttonText = this.getAttribute('buttonText') ?? SignUpForm.defaultButtonText;

    this.render();

    this.getRefs();
    this.handleInputEvents('subscribe');
    this.formRef.addEventListener('submit', this.onSubmit);
  }

  disconnectedCallback() {
    this.store.unsibscribe(this.subscription);
    this.formRef.removeEventListener('submit', this.onSubmit);
    this.handleInputEvents('unsubscribe');
  }

  getRefs() {
    this.formRef = this.querySelector('.signup-form');
  }

  // subscribes to input events
  handleInputEvents(type) {
    const { userName, characterName, email } = this.formRef.elements;

    [userName, characterName, email].forEach((input) => {
      const isSubscription = type === 'subscribe';

      if (isSubscription) {
        input.addEventListener('blur', this.onBlur);
        input.addEventListener('input', this.onInputChange);
        input.addEventListener('focus', this.onFocus);
      } else {
        input.removeEventListener('blur', this.onBlur);
        input.removeEventListener('input', this.onInputChange);
        input.removeEventListener('focus', this.onFocus);
      }
    });
  }

  // submits form
  onSubmit(event) {
    event.preventDefault();
    const { userName, characterName, email } = event.currentTarget.elements;

    // if some how there are no values, then return
    if (userName.value === '' || characterName.value === '' || email.value === '') return;

    const user = {
      userName: userName.value,
      characterName: characterName.value,
      email: email.value
    };

    this.formSubmitHandler(APP_KEYS.LOCAL_STORAGE_KEYS.USER, user);
  }

  // corrects styles on value change
  onFocus({ currentTarget }) {
    const { parentElement } = currentTarget;

    this.removeErrorMessage(parentElement);
    parentElement.classList.remove('field-invalid');
  }

  // corrects styles on value change
  onInputChange(event) {
    const { value, parentElement } = event.currentTarget;

    if (value) return;

    this.removeErrorMessage(parentElement);
    parentElement.classList.remove('field-valid');
    parentElement.classList.remove('field-invalid');
  }

  // validates input on loose focus
  onBlur({ currentTarget }) {
    const { value: rawValue, parentElement, name } = currentTarget;

    // cuts white spaces on both sides
    const value = rawValue.trim();

    if (!value) {
      this.appendErrorMessage(SignUpForm.errors.required, parentElement);
      return parentElement.classList.add('field-invalid');
    }

    if (name !== SignUpForm.inputNames.email) {
      this.removeErrorMessage(parentElement);
      return parentElement.classList.add('field-valid');
    }

    if (!this.validateEmail(value)) {
      this.appendErrorMessage(SignUpForm.errors.invalid(name), parentElement);
      return parentElement.classList.add('field-invalid');
    }

    this.removeErrorMessage(parentElement);
    parentElement.classList.add('field-valid');
  }

  /**
   * appends error notification to element
   * @param {string} msg // messsage
   * @param {HTMLElement} containerEl // node element
   * @returns {void}
   */
  appendErrorMessage(msg, containerEl) {
    const errorEl = document.createElement('strong');
    errorEl.textContent = msg;
    errorEl.classList.add('signup-form__field-error');

    containerEl.appendChild(errorEl);
  }

  /**
   * removes error notification to element
   * @param {HTMLElement} containerEl // node element
   * @returns {void}
   */
  removeErrorMessage(containerEl) {
    const errorEl = document.querySelector('.signup-form__field-error');
    const isDescendant = containerEl.contains(errorEl);

    if (!errorEl || !isDescendant) return;

    containerEl.removeChild(errorEl);
  }

  render() {
    this.innerHTML = `
        <article class="full-height pt-3rem">
            <app-logo class="mb-2rem"></app-logo>
            <div class="signup-form__outer-wrapper">
                <h1 class="signup-form__title">${this.title}</h1>

                <form class="signup-form">
                    <label class="signup-form__field">
                        <input
                            type="text"
                            name="${SignUpForm.inputNames.userName}"
                            required
                            placeholder=" "
                        />
                        <span class="signup-form__field-placeholder" role="placeholder">Enter your name</span> 
                        <svg class="signup-form__field-icon signup-form__field-icon--user">
                            <use href="/src/assets/icons/form/form-icons-sprite.svg#icon-user" />
                        </svg>
                        <button type="button" class="signup-form__field-clear-btn"></button>
                    </label>
                    <label class="signup-form__field">
                        <input
                            type="text"
                            name="${SignUpForm.inputNames.characterName}"
                            required
                            placeholder=" "
                        />
                        <span class="signup-form__field-placeholder" role="placeholder">Enter character name</span> 
                        <svg class="signup-form__field-icon signup-form__field-icon--user">
                            <use href="/src/assets/icons/form/form-icons-sprite.svg#icon-user" />
                        </svg>
                        <button type="button" class="signup-form__field-clear-btn"></button>
                    </label>
                    <label class="signup-form__field">
                        <input
                            type="text"
                            name="${SignUpForm.inputNames.email}"
                            required
                            placeholder=" "
                        />
                        <span class="signup-form__field-placeholder" role="placeholder">Enter email</span>
                        <svg class="signup-form__field-icon signup-form__field-icon--email">
                            <use href="/src/assets/icons/form/form-icons-sprite.svg#icon-email" />
                        </svg>
                        <button type="button" class="signup-form__field-clear-btn"></button>
                     </label>
                    <button class="signup-form__submit-button" type="submit">${this.buttonText}</button>
                </form>
            </div>
        </article>
    `;
  }
}

customElements.define('signup-form', SignUpForm);
