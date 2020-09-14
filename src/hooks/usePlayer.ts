import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import { GlobalState } from 'src/store';
import { DeviceState } from 'src/store/Device/types';

const usePlayer = (): ((options: AxiosRequestConfig) => void) => {
  const [cookie] = useCookies(['access']);
  const deviceId = useSelector<GlobalState, DeviceState['deviceId']>(
    (state: GlobalState) => state.device.deviceId
  );

  return (options: AxiosRequestConfig): void => {
    axios({
      url: options.url,
      method: options.method,
      data: options.data,
      baseURL: 'https://api.spotify.com/v1',
      headers: {
        Authorization: `Bearer ${cookie.access?.access_token}`,
      },
      params: {
        device_id: deviceId,
      },
    });
  };
};

export default usePlayer;
