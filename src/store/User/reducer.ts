import { UserActions, UserTypes, UserState } from './types';
import { UserPlaylist } from 'src/pages/_app';

const initialState: UserState = {
  username: '',
  playlists: [],
};

const userReducer = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case UserTypes.STORE_USER:
      const { username, playlists } = action;
      return {
        username,
        playlists,
      };
    case UserTypes.CLEAR_USER:
      return {
        username: '',
        playlists: [],
      };
    case UserTypes.UPDATE_PLAYLISTS:
      const { id, name } = action;
      if (state.playlists.some((playlist: UserPlaylist) => playlist.id === id))
        return {
          ...state,
          playlists: state.playlists.filter(
            (playlist: UserPlaylist) => playlist.id !== id
          ),
        };
      else
        return {
          ...state,
          playlists: [{ id, name }, ...state.playlists],
        };
    default:
      return state;
  }
};

export default userReducer;
