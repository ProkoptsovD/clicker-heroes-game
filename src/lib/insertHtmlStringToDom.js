/**
 * inserts string markup to DOM
 * @param {{
 *  template: string,
 *  containerNode: HTMLElement,
 *  position: 'beforebegin' | 'beforeend' | 'afterbegin' | 'afterend' | undefined
 * }} config // accepts object
 * {
 *   template // string html code,
 *   containerNode // DOM element where markup should be inserted,
 *   position // place of cintainerwhere markup should be inserted, 'beforeend' is default }
 * @returns {void}
 */
export function insertHtmlStringToDom({ template, containerNode, position = 'beforeend' } = {}) {
  if (!template && !containerNode) throw new Error('Both params are required');

  containerNode.insertAdjacentHTML(position, template);
}
