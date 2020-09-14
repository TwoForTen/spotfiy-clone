import { HistoryActions, HistoryState, HistoryTypes } from './types';

const initialState: HistoryState = {
  href: '',
  as: '',
};

const historyReducer = (
  state = initialState,
  action: HistoryActions
): HistoryState => {
  switch (action.type) {
    case HistoryTypes.STORE_URL:
      return {
        href: action.href,
        as: action.as,
      };
    default:
      return state;
  }
};

export default historyReducer;
