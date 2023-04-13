/**
 * creates a rain from confetti
 */
export class Confetti {
  /**
   * @param {{ containerRef: HTMLElement }} config // config confetti
   */
  constructor({ containerRef } = {}) {
    this.CONFETTI_GENERATION_SPEED = 25;
    this.CONFETTI_LIFE_LENGTH = 3000;

    this.containerRef = containerRef;
    this.confettiFrequency = 3;
    this.confettiColors = ['#EF2964', '#00C09D', '#2D87B0', '#48485E', '#EFFF1D'];
    this.confettiAnimations = ['slow', 'medium', 'fast'];

    this.el = document.createElement('div');

    this.el.style.top = '0px !important';
    this.el.classList.add('confetti__wrapper');

    this.setupElements();
    this.render();
  }

  // setups sub container holding all the confetti
  setupElements() {
    const subConfettiContainer = document.createElement('div');
    const elPosition = this.el.style.position;

    if (elPosition !== 'relative' || elPosition !== 'absolute') {
      this.el.style.position = 'relative';
    }

    subConfettiContainer.classList.add('confetti-container');

    this.el.appendChild(subConfettiContainer);

    this.subConfettiContainer = subConfettiContainer;
    this.containerRef.appendChild(this.subConfettiContainer);
  }

  // creates confetti and adds them to DOM
  render() {
    this.intervalID = setInterval(() => {
      // creates single confetti element
      const confettiEl = document.createElement('div');

      // calculate confetti size
      const confettiSize = Math.floor(Math.random() * 3) + 7 + 'px';

      // sets confetti background color
      const confettiBackground =
        this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];

      // calculate confetti left position
      // should be in range from 0 to container element width
      const parentWidth = this.containerRef.getBoundingClientRect().width;
      const confettiLeft = this.getRandomNumber(0, parentWidth) + 'px';

      // calculates animation speed
      const confettiAnimation =
        this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];

      // config single confeti element
      confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
      confettiEl.style.left = confettiLeft;
      confettiEl.style.width = confettiSize;
      confettiEl.style.height = confettiSize;
      confettiEl.style.backgroundColor = confettiBackground;

      // clearing up confetti not to overload the DOM
      confettiEl.removeTimeout = setTimeout(() => {
        confettiEl.parentNode?.removeChild(confettiEl);
      }, this.CONFETTI_LIFE_LENGTH);

      // adding to confetti to DOM
      this.subConfettiContainer.appendChild(confettiEl);
    }, this.CONFETTI_GENERATION_SPEED);
  }

  /** generates values in range including min and max points */
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /** stops confetti generation loop */
  destroy() {
    clearInterval(this.intervalID);
  }
}
