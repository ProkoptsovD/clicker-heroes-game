/**
 * Service that takes care about data validation
 */
class ValidationService {
  static emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  /**
   * config service via constructor
   * @param {{ emailRegexp: RegExp }} config
   */
  constructor({ emailRegexp } = {}) {
    this.emailRegexp = emailRegexp;
    this.validateEmail = this.validateEmail.bind(this);
  }

  /**
   * method for email validation
   * @param {string} strWithEmail
   * @param {{ regexp: RegExp }} config
   * @returns {boolean}
   */
  validateEmail(strWithEmail, { regexp = this.emailRegexp } = {}) {
    return strWithEmail.match(regexp);
  }
}

export const validationService = new ValidationService({
  emailRegexp: ValidationService.emailRegexp
});
