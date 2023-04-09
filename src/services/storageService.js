/**
 * Service thant handles saving data to storage
 * for now it's only the local storage
 */
class StorageService {
  /**
   * @param {string} key
   * @param {any} value
   * @returns {void}
   */
  save(key, value) {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }

  /**
   * @param {string} key
   * @returns {undefined | unknown | void}
   */
  load(key) {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }
}

export const localStorageService = new StorageService();
