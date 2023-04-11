// actions
import {
  DECREMENT_STAMINA,
  RESET_STAMINA,
  SET_ACTIVE_MENU_TAB,
  NEXT_LEVEL,
  SET_STAMINA,
  SET_TOTAL_SCORE
} from './actions.js';

export function rootReducer(state, action) {
  switch (action.type) {
    case SET_ACTIVE_MENU_TAB:
      return {
        ...state,
        activeTab: action.payload.activeTab
      };
    case DECREMENT_STAMINA:
      return {
        ...state,
        stamina: action.payload.stamina,
        totalScore: state.totalScore + 1
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
    default:
      return state;
  }
}
