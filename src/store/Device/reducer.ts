import { DeviceState, DeviceActions, DeviceTypes } from './types';

const initialState: DeviceState = {
  deviceId: '',
};

const deviceReducer = (
  state = initialState,
  action: DeviceActions
): DeviceState => {
  switch (action.type) {
    case DeviceTypes.STORE_DEVICE_ID:
      return {
        deviceId: action.deviceId,
      };
    default:
      return state;
  }
};

export default deviceReducer;
