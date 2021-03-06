import { useEffect } from 'react';
import Script from 'react-load-script';
import Header from 'src/components/Header';
import Sidebar from 'src/components/Sidebar';
import FooterPlayer from 'src/components/Player';
import { UserPlaylist } from 'src/pages/_app';
import { useDispatch, useSelector } from 'react-redux';
import { storeUser } from 'src/store/User/actions';
import { storeDeviceId } from 'src/store/Device/actions';
import { storeTrack } from 'src/store/PlayingNow/actions';
import useLogout from 'src/hooks/useLogout';
import Head from 'next/head';
import { GlobalState } from 'src/store';
import { PlayingNowState } from 'src/store/PlayingNow/types';
import { isEmpty } from 'lodash';

type Props = {
  username: string;
  playlists: UserPlaylist[];
  accessToken: string;
};

const AppLayout: React.FC<Props> = ({
  username,
  playlists,
  accessToken,
}): JSX.Element => {
  const dispatch = useDispatch();
  const logout = useLogout();
  const playingNow = useSelector<GlobalState, PlayingNowState>(
    (state: GlobalState) => state.playingNow
  );

  useEffect(() => {
    dispatch(storeUser({ username, playlists }));
  }, [username]);

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
          player.removeListener('ready');
          player.removeListener('player_state_changed');
          player.removeListener('not_ready');
          player.disconnect();
          logout();
        });
        player.addListener('authentication_error', ({ message }: any) => {
          console.error(message);
          player.removeListener('ready');
          player.removeListener('player_state_changed');
          player.removeListener('not_ready');
          player.disconnect();
          logout();
        });
        player.addListener('account_error', ({ message }: any) => {
          console.error(message);
          player.removeListener('ready');
          player.removeListener('player_state_changed');
          player.removeListener('not_ready');
          player.disconnect();
          logout();
        });
        player.addListener('playback_error', ({ message }: any) => {
          console.error(message);
          player.disconnect();
          logout();
        });

        // Playback status updates
        player.addListener('player_state_changed', (state: any) => {
          dispatch(
            storeTrack({
              context: {
                description: state?.context.metadata.context_description,
                uri: state?.context.uri,
                id: state?.context.uri?.split(':')[2] || '',
                type: state?.context.uri?.split(':')[1] || '',
              },
              artists: state?.track_window.current_track.artists,
              duration: state?.duration,
              position: state?.position,
              id:
                state?.track_window.current_track.linked_from.id ||
                state?.track_window.current_track.id,
              imageUrl: state?.track_window.current_track.album.images[0].url,
              name: state?.track_window.current_track.name,
              paused: state?.paused,
              nextTrack:
                state?.track_window.next_tracks.length > 0 ? true : false,
              previousTrack:
                state?.track_window.previous_tracks.length > 0 ? true : false,
            })
          );
        });

        // Ready
        player.addListener('ready', ({ device_id }: any) => {
          dispatch(storeDeviceId({ deviceId: device_id }));
        });

        // Connect to the player!
        player.connect();
      };
    }
  }, []);
  return (
    <>
      {playingNow.name !== '' && !isEmpty(playingNow.artists) && (
        <Head>
          <title>{`${playingNow.name} - ${playingNow.artists
            .map((artist: any) => artist.name)
            .join(', ')}`}</title>
        </Head>
      )}
      <Header />
      <Sidebar />
      <FooterPlayer />
      <Script url="https://sdk.scdn.co/spotify-player.js" onLoad={() => {}} />
    </>
  );
};

export default AppLayout;
