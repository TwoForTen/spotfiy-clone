import { combineReducers, createStore, compose } from 'redux';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export interface GlobalState {}

const reducers = combineReducers({});

const store = createStore(reducers, composeEnhancers());

export default store;
