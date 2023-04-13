import { createStore } from '../lib/createStore.js';
import { rootReducer } from './rootReducer.js';
import { initialState } from './initialState.js';

export const store = createStore(rootReducer, initialState);
