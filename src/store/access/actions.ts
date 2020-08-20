import { STORE_USER, UserState, AccessActions } from './types';

export const storeUser = (payload: UserState): AccessActions => {
  return {
    type: STORE_USER,
    payload,
  };
};
