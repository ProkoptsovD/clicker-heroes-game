/**
 * Here we use ONLY autonomous web components
 * 'cause those ones have best browser support
 *
 * - sending greatings to Safari =)
 *
 * for support check here: https://caniuse.com/?search=web%20components
 * check spec here: https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements
 */
export class WebComponent extends HTMLElement {
  constructor({ template } = {}) {
    super();

    this.template = template ?? `<div>WebComponent default template</div>`;
  }

  /**
   * HTML element lifecycle method
   * invokes when element is successfully mounted in the DOM
   */
  connectedCallback() {
    this.render();
  }

  /**
   * transforms string | strings into html tag for innerHtml mehtod
   * @param {string | Array<string>} data // tag name or tag names of custom element without <></>
   * @returns {string}
   */
  _transformIntoTag({ tag, props } = {}) {
    if (!tag) throw new Error('Tag key is required');
    if (typeof tag !== 'string') throw new Error('Tag key must be a string');

    if (props) {
      const mappedProps = Object.entries(props).map(([key, value]) => {
        let htmlAttrValue = value;

        // if value is an array we add array literals
        // to be able to parse it properly in certain component
        if (this._isArray(value)) htmlAttrValue = `[${value}]`;

        // if value is an object we add object literals
        // to be able to parse it properly in certain component
        if (this._isObject(value)) htmlAttrValue = `{${value}}`;

        return `${key}="${htmlAttrValue}"`;
      });

      return `<${tag} ${mappedProps.join(' ')}></${tag}>`;
    }

    return `<${tag}></${tag}>`;
  }

  /**
   * @param {string} str // accepts string with array literals ---> '[1, 2, 3]'
   * @returns {Array}
   */
  _convertStringArrayIntoArray(str) {
    const REGEXP = /\[|\]/g;

    const hasArrayLiterals = REGEXP.test(str);
    if (!hasArrayLiterals) throw new Error('String must contain array literals');

    return str.replace(REGEXP, '').split(',');
  }

  /**
   * @param {any} arr // checks whether varibale is an array
   * @returns {boolean}
   */
  _isArray(arr) {
    return Array.isArray(arr);
  }

  /**
   * @param {any} obj // checks whether varibale is an object
   * @returns {boolean}
   */
  _isObject(obj) {
    return typeof obj === 'object' && !this._isArray(obj) && obj !== null;
  }

  /**
   * custom render method for generating markup template
   */
  render() {
    this.innerHTML = this.template;
  }
}
