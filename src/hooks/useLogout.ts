import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import usePlayer from 'src/hooks/usePlayer';
import { Options } from 'src/axiosInstance';
import { clearUser } from 'src/store/User/actions';
import { clearPlayingNow } from 'src/store/PlayingNow/actions';
import { storeDeviceId } from 'src/store/Device/actions';

const useLogout = (): (() => void) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const player = usePlayer();
  const [, , removeCookie] = useCookies(['access']);

  const PAUSE_PLAYING: Options = {
    url: '/me/player/pause',
    method: 'put',
  };
  const { url, method } = PAUSE_PLAYING;

  return () => {
    player({ url, method });
    dispatch(clearUser());
    dispatch(clearPlayingNow());
    dispatch(storeDeviceId({ deviceId: '' }));
    removeCookie('access');
    router.replace('/');
  };
};

export default useLogout;
