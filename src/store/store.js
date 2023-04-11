import { createStore } from '../lib/createStore.js';
import { rootReducer } from './rootReducer.js';

const initialState = {
  activeTab: '0',
  user: {
    userName: 'Dima',
    characterName: 'Ventura',
    email: 'fenderman1992@gmail.com'
  },
  level: 1,
  stamina: 10,
  totalScore: 0
};

export const store = createStore(rootReducer, initialState);
