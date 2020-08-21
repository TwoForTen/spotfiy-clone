import { STORE_ACCESS, AccessState, AccessActions } from './types';

export const storeAccess = (payload: AccessState): AccessActions => {
  return {
    type: STORE_ACCESS,
    payload,
  };
};
