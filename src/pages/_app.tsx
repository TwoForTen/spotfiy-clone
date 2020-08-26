import Head from 'next/head';
import App, { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import store from 'src/store';
import { CookiesProvider } from 'react-cookie';

import { GlobalStyle } from '../styles';
import { theme } from '../styles/theme';

type Props = AppProps & { userId: string };

const MyApp = ({ Component, pageProps, userId }: Props): JSX.Element => {
  console.log(userId);
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

MyApp.getInitialProps = async (appContext: any): Promise<any> => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps, userId: 'aas' };
};

export default MyApp;
