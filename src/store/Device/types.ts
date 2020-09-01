export enum DeviceTypes {
  STORE_DEVICE_ID = 'STORE_DEVICE_ID',
  CLEAR_DEVICE_ID = 'CLEAR_DEVICE_ID',
}

export interface DeviceState {
  deviceId: string;
}

interface StoreDeviceId {
  type: DeviceTypes.STORE_DEVICE_ID;
  deviceId: string;
}

export type DeviceActions = StoreDeviceId;
