import { SearchState, SearchActions, SearchTypes } from './types';

const initialState: SearchState = {
  albums: [],
  playlists: [],
  artists: [],
  tracks: [],
};

const searchReducer = (
  state = initialState,
  action: SearchActions
): SearchState => {
  switch (action.type) {
    case SearchTypes.STORE_SEARCH:
      return {
        albums: action.albums,
        playlists: action.playlists,
        artists: action.artists,
        tracks: action.tracks,
      };
    default:
      return state;
  }
};

export default searchReducer;
