import { PlayingNowActions, PlayingNowState, PlayingNowTypes } from './types';

const initialState: PlayingNowState = {
  context: {
    contextDescription: '',
    contextUri: '',
  },
  duration: 0,
  position: 0,
  paused: true,
  imageUrl: '',
  artists: [],
  id: '',
  name: '',
  volume: 75,
  nextTrack: false,
  previousTrack: false,
};

const playingNowReducer = (
  state = initialState,
  action: PlayingNowActions
): PlayingNowState => {
  switch (action.type) {
    case PlayingNowTypes.STORE_TRACK:
      return action.playingNow;
    case PlayingNowTypes.UPDATE_POSITION:
      return {
        ...state,
        position: action.position,
      };
    default:
      return state;
  }
};

export default playingNowReducer;
