import { useEffect } from 'react';
import Header from 'src/components/Header';
import Sidebar from 'src/components/Sidebar';
import FooterPlayer from 'src/components/Player';
import { UserPlaylists } from 'src/pages/_app';
import { useDispatch } from 'react-redux';
import { storeDeviceId } from 'src/store/Device/actions';
import Script from 'react-load-script';

type Props = {
  username: string;
  playlists: UserPlaylists;
  accessToken: string;
};

const AppLayout: React.FC<Props> = ({
  username,
  playlists,
  accessToken,
}): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const token: string = accessToken;
        const player = new window.Spotify.Player({
          name: 'Web Playback SDK Quick Start Player',
          getOAuthToken: (cb: (token: string) => void) => {
            cb(token);
          },
        });

        // Error handling
        player.addListener('initialization_error', ({ message }: any) => {
          console.error(message);
        });
        player.addListener('authentication_error', ({ message }: any) => {
          console.error(message);
        });
        player.addListener('account_error', ({ message }: any) => {
          console.error(message);
        });
        player.addListener('playback_error', ({ message }: any) => {
          console.error(message);
        });

        // Playback status updates
        player.addListener('player_state_changed', (state: any) => {
          console.log(state);
        });

        // Ready
        player.addListener('ready', ({ device_id }: any) => {
          dispatch(storeDeviceId({ deviceId: device_id }));
          console.log('Ready with Device ID', device_id);
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }: any) => {
          console.log('Device ID has gone offline', device_id);
        });

        // Connect to the player!
        player.connect();
      };
    }
  }, []);
  return (
    <>
      <Header username={username} />
      <Sidebar playlists={playlists} />
      <FooterPlayer />
      <Script url="https://sdk.scdn.co/spotify-player.js" onLoad={() => {}} />
    </>
  );
};

export default AppLayout;
