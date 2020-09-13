import { UserPlaylist } from 'src/pages/_app';

export enum UserTypes {
  STORE_USER = 'STORE_USER',
  CLEAR_USER = 'CLEAR_USER',
  UPDATE_PLAYLISTS = 'UPDATE_PLAYLISTS',
}

export interface UserState {
  username: string;
  playlists: UserPlaylist[];
}

export interface StoreUser {
  type: UserTypes.STORE_USER;
  username: string;
  playlists: UserPlaylist[];
}

export interface ClearUser {
  type: UserTypes.CLEAR_USER;
}

export interface UpdatePlaylists {
  type: UserTypes.UPDATE_PLAYLISTS;
  id: string;
  name: string;
}

export type UserActions = StoreUser | ClearUser | UpdatePlaylists;
