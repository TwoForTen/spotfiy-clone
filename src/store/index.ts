import { combineReducers, createStore, compose } from 'redux';
import deviceReducer from './Device/reducer';
import { DeviceState } from './Device/types';

import playingNowReducer from './PlayingNow/reducer';
import { PlayingNowState } from './PlayingNow/types';

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
  device: DeviceState;
  playingNow: PlayingNowState;
}

const reducers = combineReducers({
  device: deviceReducer,
  playingNow: playingNowReducer,
});

const store = createStore(reducers, composeEnhancers());

export default store;
