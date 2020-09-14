import { StoreUrl, HistoryState, HistoryTypes } from './types';

export const storeUrl = ({ href, as }: HistoryState): StoreUrl => {
  return {
    type: HistoryTypes.STORE_URL,
    href,
    as,
  };
};
