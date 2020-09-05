import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import axios from 'src/axiosInstance';
import { AxiosRequestConfig } from 'axios';
import { GlobalState } from 'src/store';
import { DeviceState } from 'src/store/Device/types';
import useAuth from 'src/hooks/useAuth';

const usePlayer = (): ((options: AxiosRequestConfig) => void) => {
  const [cookie] = useCookies(['access']);
  const deviceId = useSelector<GlobalState, DeviceState['deviceId']>(
    (state: GlobalState) => state.device.deviceId
  );

  const [error, setError] = useState<number>(-1);

  useAuth(error);

  return (options: AxiosRequestConfig): void => {
    axios(cookie.access.access_token)({
      url: options.url,
      method: options.method,
      data: options.data,
      params: {
        device_id: deviceId,
      },
    }).catch((e) => setError(e.response.data.error.status));
  };
};

export default usePlayer;
