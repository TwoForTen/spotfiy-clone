import { combineReducers, createStore, compose } from 'redux';
import { AccessState } from './access/types';
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

export interface GlobalState {
  access: AccessState;
}

const reducers = combineReducers({
  access: accessReducer,
});

const store = createStore(reducers, composeEnhancers());

export default store;
