import { createStore } from '../lib/createStore.js';

// actions
import { SET_ACTIVE_MENU_TAB } from './actions.js';

function rootReducer(state, action) {
  switch (action.type) {
    case SET_ACTIVE_MENU_TAB:
      return {
        ...state,
        activeTab: action.payload.activeTab
      };
    default:
      return state;
  }
}

export const store = createStore(rootReducer, { activeTab: '0' });
