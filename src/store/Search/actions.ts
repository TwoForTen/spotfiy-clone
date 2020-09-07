import { SearchState, SearchActions, SearchTypes } from './types';

export const storeSearch = ({
  albums,
  artists,
  tracks,
  playlists,
}: SearchState): SearchActions => {
  return {
    type: SearchTypes.STORE_SEARCH,
    albums,
    artists,
    tracks,
    playlists,
  };
};
