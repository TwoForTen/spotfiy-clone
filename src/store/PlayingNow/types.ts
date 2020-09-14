export enum PlayingNowTypes {
  STORE_TRACK = 'STORE_TRACK',
  UPDATE_POSITION = 'UPDATE_POSITION',
  CLEAR_PLAYING_NOW = 'CLEAR_PLAYING_NOW',
}

export interface PlayingNowState {
  context: {
    description: string;
    uri: string;
    id: string;
    type: string;
  };
  duration: number;
  position: number;
  paused: boolean;
  imageUrl: string;
  artists: { name: string }[];
  id: string;
  name: string;
  volume?: number;
  nextTrack: boolean;
  previousTrack: boolean;
}

export interface StoreTrack {
  type: PlayingNowTypes.STORE_TRACK;
  playingNow: PlayingNowState;
}

export interface ClearPlayingNow {
  type: PlayingNowTypes.CLEAR_PLAYING_NOW;
}

export type PlayingNowActions = StoreTrack | ClearPlayingNow;
