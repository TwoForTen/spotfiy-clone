import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from 'src/store';

import { GlobalStyle } from '../styles';
import { theme } from '../styles/theme';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }): JSX.Element => {
  const store = createStore(reducers);

  return (
    <>
      <Head>
        <title>Spotify - Minimal Clone </title>
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default MyApp;
