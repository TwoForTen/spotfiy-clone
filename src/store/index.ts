import { combineReducers, createStore, compose } from 'redux';

import { accessReducer } from './access/reducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  access: accessReducer,
});

const store = createStore(reducers, composeEnhancers());

export default store;
