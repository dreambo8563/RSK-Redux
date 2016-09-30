import { combineReducers } from 'redux'
import appReducer from './../models/appState'

export const makeRootReducer = (asyncReducers = appReducer) => {
  return combineReducers({
    ...asyncReducers, 'appState':appReducer
  })
}

// inject appState every time
export const injectReducer = (store, reducerArr) => {
  reducerArr.forEach((item) => {
    store.asyncReducers[item.key] = item.reducer
  })

  store.asyncReducers['appState'] = appReducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
