import { STORE_USER, UserState, AccessActions } from './types';

const initialState: UserState = {
  access_token: '',
  token_type: '',
  expires_in: 0,
};

export const accessReducer = (
  state = initialState,
  action: AccessActions
): UserState => {
  switch (action.type) {
    case STORE_USER:
      return {
        access_token: action.payload.access_token,
        token_type: action.payload.token_type,
        expires_in: +action.payload.expires_in,
      };
    default:
      return state;
  }
};
