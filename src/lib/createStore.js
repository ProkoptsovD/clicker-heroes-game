/**
 * It's custom redux like state manager
 * providing centralized control over app state
 * @param {Function} reducer // redux like reducer to do some manipulations with data
 * @param {Object} initialState // possibility of adding store initial state
 * @returns {Object} store with traditional API ----> { getState, dispatch, subscribe, unsibscribe }
 */
const createStore = (reducer, initialState) => {
  /** state Oobject containing info about app */
  let state = initialState ?? {};

  /** array of subscribers to be notified on certain action */
  let subscriptions = [];

  /** simple getter, returns actual state */
  const getState = () => state;

  /**
   * classic redux like action dispatcher
   * @param {Object} action // must be an object with one obligatory 'type' field ----> { type: 'string', payload?: 'any }
   * @returns {void}
   */
  const dispatch = (action) => {
    // update state
    state = reducer(state, action);

    // notify reducers
    subscriptions.forEach((subscriber) => subscriber());
  };

  /**
   * adds subsciption
   * @param {Function} subscriber // callback to be executed on action
   * @returns {void}
   */
  const subscribe = (subscriber) => {
    subscriptions.push(subscriber);
  };

  /**
   * usubscribes subscriber from action
   * @param {Function} subscriber // callback to be removed
   * @returns {void}
   */
  const unsibscribe = (subscriber) => {
    subscribers = subscribers.filter((l) => l !== subscriber);
  };

  return { getState, dispatch, subscribe, unsibscribe };
};
