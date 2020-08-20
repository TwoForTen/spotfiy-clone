export const STORE_USER = 'STORE_USER';

export interface UserState {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface StoreUserAction {
  type: typeof STORE_USER;
  payload: UserState;
}

export type AccessActions = StoreUserAction;
