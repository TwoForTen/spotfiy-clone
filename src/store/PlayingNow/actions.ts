import {
  PlayingNowTypes,
  PlayingNowState,
  StoreTrack,
  ClearPlayingNow,
} from './types';

export const storeTrack = (payload: PlayingNowState): StoreTrack => {
  return {
    type: PlayingNowTypes.STORE_TRACK,
    playingNow: payload,
  };
};

export const clearPlayingNow = (): ClearPlayingNow => {
  return {
    type: PlayingNowTypes.CLEAR_PLAYING_NOW,
  };
};
