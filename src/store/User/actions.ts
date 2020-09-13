import {
  StoreUser,
  ClearUser,
  UpdatePlaylists,
  UserTypes,
  UserState,
} from './types';
import { UserPlaylist } from 'src/pages/_app';

export const storeUser = ({ username, playlists }: UserState): StoreUser => {
  return {
    type: UserTypes.STORE_USER,
    username,
    playlists,
  };
};

export const clearUser = (): ClearUser => {
  return {
    type: UserTypes.CLEAR_USER,
  };
};

export const updatePlaylists = ({
  id,
  name,
}: UserPlaylist): UpdatePlaylists => {
  return {
    type: UserTypes.UPDATE_PLAYLISTS,
    id,
    name,
  };
};
