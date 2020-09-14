import { combineReducers, createStore, compose } from 'redux';
import undoable, { StateWithHistory } from 'redux-undo';
import deviceReducer from './Device/reducer';
import { DeviceState } from './Device/types';

import playingNowReducer from './PlayingNow/reducer';
import { PlayingNowState } from './PlayingNow/types';

import userReducer from './User/reducer';
import { UserState } from './User/types';

import searchReducer from './Search/reducer';
import { SearchState } from './Search/types';

import historyReducer from './History/reducer';
import { HistoryState } from './History/types';

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
  user: UserState;
  search: SearchState;
  history: StateWithHistory<HistoryState>;
}

const reducers = combineReducers({
  device: deviceReducer,
  playingNow: playingNowReducer,
  user: userReducer,
  search: searchReducer,
  history: undoable(historyReducer, { ignoreInitialState: true }),
});

const store = createStore(reducers, composeEnhancers());

export default store;
