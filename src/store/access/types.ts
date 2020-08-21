export const STORE_ACCESS = 'STORE_ACCESS';

export interface AccessState {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

interface storeAccessAction {
  type: typeof STORE_ACCESS;
  payload: AccessState;
}

export type AccessActions = storeAccessAction;
