import Head from 'next/head';
import App, { AppProps, AppContext } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import store from 'src/store';
import { CookiesProvider } from 'react-cookie';
import cookies from 'next-cookies';
import axiosInstance from 'src/axiosInstance';
import axios from 'axios';

import { GlobalStyle } from '../styles';
import { theme } from '../styles/theme';

import Header from 'src/components/Header';
import Sidebar from 'src/components/Sidebar';

type InitialProps = { username: string; playlists: UserPlaylists };

type Props = AppProps & InitialProps;

interface Cookie {
  access_token: string;
}

export type UserPlaylists = {
  id: string;
  name: string;
}[];

const MyApp = ({
  Component,
  pageProps,
  username,
  playlists,
}: Props): JSX.Element => {
  return (
    <>
      <Head>
        <title>Spotify - Minimal Clone </title>
      </Head>
      <Provider store={store}>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
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

  return { ...appProps, username, playlists };
};

export default MyApp;
