import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import store from 'src/store';
import { CookiesProvider } from 'react-cookie';

import { GlobalStyle } from '../styles';
import { theme } from '../styles/theme';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }): JSX.Element => {
  return (
    <>
      <Head>
        <title>Spotify - Minimal Clone </title>
      </Head>
      <Provider store={store}>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Component {...pageProps} />
          </ThemeProvider>
        </CookiesProvider>
      </Provider>
    </>
  );
};

export default MyApp;
