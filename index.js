/**
 * It is IMPORTANT all custom web components that are used
 * must be at IMPORTED, othrewise they won't be rendered
 * that's why you may see unused imports somewhere
 */

import { App } from './App.js';

const app = new App({ selector: '#root' });
app.init();
