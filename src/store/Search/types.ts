export enum SearchTypes {
  STORE_SEARCH = 'STORE_SEARCH',
}

export interface SearchState {
  playlists: any[];
  albums: any[];
  artists: any[];
  tracks: any[];
}

export interface StoreSearch {
  type: SearchTypes.STORE_SEARCH;
  playlists: any[];
  albums: any[];
  artists: any[];
  tracks: any[];
}

export type SearchActions = StoreSearch;
