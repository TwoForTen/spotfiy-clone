import { useEffect } from 'react';
import Head from 'next/head';
import App, { AppProps, AppContext } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import store from 'src/store';
import { CookiesProvider } from 'react-cookie';
import cookies from 'next-cookies';
import axiosInstance from 'src/axiosInstance';
import axios from 'axios';
import Script from 'react-load-script';
import { Cookie } from 'src/interfaces/Cookie';
import { GlobalStyle } from '../styles';
import { theme } from '../styles/theme';
import Header from 'src/components/Header';
import Sidebar from 'src/components/Sidebar';

type InitialProps = {
  username: string;
  playlists: UserPlaylists;
  accessToken: string;
};

type Props = AppProps & InitialProps;

export type UserPlaylists = {
  id: string;
  name: string;
}[];

const MyApp = ({
  Component,
  pageProps,
  username,
  playlists,
  accessToken,
}: Props): JSX.Element => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const token = accessToken;
        const player = new window.Spotify.Player({
          name: 'Web Playback SDK Quick Start Player',
          getOAuthToken: (cb: any) => {
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
      <Head>
        <title>Spotify - Minimal Clone </title>
      </Head>
      <Provider store={store}>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
            <Script
              url="https://sdk.scdn.co/spotify-player.js"
              onLoad={() => {}}
            />
            <GlobalStyle />
            {!!username && (
              <>
                <Header username={username} />
                <Sidebar playlists={playlists} />
              </>
            )}
            <Component {...pageProps} />
          </ThemeProvider>
        </CookiesProvider>
      </Provider>
    </>
  );
};

MyApp.getInitialProps = async (
  appContext: AppContext
): Promise<InitialProps> => {
  const appProps = await App.getInitialProps(appContext);
  const cookie: Cookie =
    cookies(appContext.ctx).access ||
    (appContext.ctx.query.access &&
      JSON.parse(`${appContext.ctx.query.access}`)) ||
    '';

  let username: string = '';
  let playlists: UserPlaylists = [];

  const getUser = () => axiosInstance(cookie.access_token).get('/me');

  const getUserPlaylists = () =>
    axiosInstance(cookie.access_token).get('/me/playlists');

  await axios
    .all([getUser(), getUserPlaylists()])
    .then(
      axios.spread((user, userPlaylists) => {
        username = user.data.display_name;
        playlists = userPlaylists.data.items.map((item: any) => {
          return {
            id: item.id,
            name: item.name,
          };
        });
      })
    )
    .catch(() => {});

  return { ...appProps, username, playlists, accessToken: cookie.access_token };
};

export default MyApp;
