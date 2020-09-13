import {
  PlayingNowTypes,
  PlayingNowState,
  StoreTrack,
  UpdatePosition,
  ClearPlayingNow,
} from './types';

export const storeTrack = (payload: PlayingNowState): StoreTrack => {
  return {
    type: PlayingNowTypes.STORE_TRACK,
    playingNow: payload,
  };
};

export const updatePosition = (payload: number): UpdatePosition => {
  return {
    type: PlayingNowTypes.UPDATE_POSITION,
    position: payload,
  };
};

export const clearPlayingNow = (): ClearPlayingNow => {
  return {
    type: PlayingNowTypes.CLEAR_PLAYING_NOW,
  };
};
