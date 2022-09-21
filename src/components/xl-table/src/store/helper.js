import Store from './index'
import debounce from 'throttle-debounce/debounce'

export function createStore(table, initialState = {}) {
  if (!table) {
    throw new Error('Table is required.')
  }
  const store = new Store()
  store.table = table
  store.toggleAllSelection = debounce(10, store._toggleAllSelection);
  Object.keys(initialState).forEach(key => {
    store.states[key] = initialState[key]
  })
  return store
}
