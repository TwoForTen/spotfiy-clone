import {
  PlayingNowTypes,
  PlayingNowState,
  StoreTrack,
  UpdatePosition,
  SetVolume,
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

export const setVolume = (payload: number): SetVolume => {
  return {
    type: PlayingNowTypes.SET_VOLUME,
    value: payload,
  };
};
