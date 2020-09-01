import { DeviceTypes, DeviceState, DeviceActions } from './types';

export const storeDeviceId = (payload: DeviceState): DeviceActions => {
  return {
    type: DeviceTypes.STORE_DEVICE_ID,
    deviceId: payload.deviceId,
  };
};
