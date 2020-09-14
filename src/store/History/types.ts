export enum HistoryTypes {
  STORE_URL = 'STORE_URL',
}

export interface HistoryState {
  href: string;
  as: string;
}

export interface StoreUrl {
  type: HistoryTypes.STORE_URL;
  href: string;
  as: string;
}

export type HistoryActions = StoreUrl;
