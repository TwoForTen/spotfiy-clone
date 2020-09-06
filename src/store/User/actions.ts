import { UserActions, UserTypes, UserState } from './types';
import { UserPlaylist } from 'src/pages/_app';

export const storeUser = ({ username, playlists }: UserState): UserActions => {
  return {
    type: UserTypes.STORE_USER,
    username,
    playlists,
  };
};

export const updatePlaylists = ({ id, name }: UserPlaylist): UserActions => {
  return {
    type: UserTypes.UPDATE_PLAYISTS,
    id,
    name,
  };
};
