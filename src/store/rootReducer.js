// actions
import {
  DECREMENT_STAMINA,
  RESET_STAMINA,
  SET_ACTIVE_MENU_TAB,
  NEXT_LEVEL,
  SET_STAMINA,
  SET_TOTAL_SCORE,
  HYDRATE_STORE
} from './actions.js';

import { localStorageService } from '../services/storageService.js';
import * as APP_KEYS from '../constants/appKeys.js';

export function rootReducer(state, action) {
  switch (action.type) {
    case SET_ACTIVE_MENU_TAB:
      return {
        ...state,
        activeTab: action.payload.activeTab
      };
    case DECREMENT_STAMINA:
      const updatedScore = state.totalScore + 1;
      localStorageService.save(APP_KEYS.LOCAL_STORAGE_KEYS.SCORE, updatedScore);

      return {
        ...state,
        stamina: action.payload.stamina,
        totalScore: updatedScore
      };
    case SET_STAMINA:
      return {
        ...state,
        stamina: action.payload.stamina
      };
    case RESET_STAMINA:
      return {
        ...state,
        stamina: 0
      };
    case NEXT_LEVEL:
      return {
        ...state,
        level: state.level + 1
      };
    case SET_TOTAL_SCORE:
      return {
        ...state,
        totalScore: action.payload.totalScore
      };
    case HYDRATE_STORE:
      return {
        ...state,
        totalScore: action.payload.score,
        user: action.payload.user
      };
    default:
      return state;
  }
}
