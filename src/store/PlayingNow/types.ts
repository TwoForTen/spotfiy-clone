export enum PlayingNowTypes {
  STORE_TRACK = 'STORE_TRACK',
  UPDATE_POSITION = 'UPDATE_POSITION',
  SET_VOLUME = 'SET_VOLUME',
}

export interface PlayingNowState {
  context: {
    contextDescription: string;
    contextUri: string;
  };
  duration: number;
  position: number;
  paused: boolean;
  imageUrl: string;
  artists: { name: string }[];
  id: string;
  name: string;
  volume?: number;
}

export interface StoreTrack {
  type: PlayingNowTypes.STORE_TRACK;
  playingNow: PlayingNowState;
}

export interface UpdatePosition {
  type: PlayingNowTypes.UPDATE_POSITION;
  position: number;
}

export interface SetVolume {
  type: PlayingNowTypes.SET_VOLUME;
  value: number;
}

export type PlayingNowActions = StoreTrack | UpdatePosition | SetVolume;
