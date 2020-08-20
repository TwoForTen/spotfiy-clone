import { combineReducers } from 'redux';

import { accessReducer } from './access/reducer';

const reducers = combineReducers({
  access: accessReducer,
});

export default reducers;
