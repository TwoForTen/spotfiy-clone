import { STORE_ACCESS, AccessState, AccessActions } from './types';

const initialState: AccessState = {
  access_token: '',
  expires_in: 0,
  refresh_token: '',
  scope: '',
  token_type: '',
};

export const accessReducer = (
  state = initialState,
  action: AccessActions
): AccessState => {
  switch (action.type) {
    case STORE_ACCESS:
      return {
        access_token: action.payload.access_token,
        expires_in: action.payload.expires_in,
        refresh_token: action.payload.refresh_token,
        scope: action.payload.scope,
        token_type: action.payload.token_type,
      };
    default:
      return state;
  }
};
