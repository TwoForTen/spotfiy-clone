import { useEffect } from 'react';
import axios from 'axios';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import cookies from 'next-cookies';

import Header from 'src/components/Header';
import Sidebar from 'src/components/Sidebar';

interface Props {
  display_name: string;
}

interface Cookie {
  access_token: string;
  token_type: string;
}

const SpotifyApp: NextPage<Props> = ({ display_name }): JSX.Element | null => {
  const router = useRouter();

  useEffect(() => {
    if (!!!display_name) {
      router.push('/');
    }
  }, [display_name]);

  if (!!!display_name) return null;

  return (
    <>
      <Header username={display_name} />
      <Sidebar />
    </>
  );
};

SpotifyApp.getInitialProps = async (
  context: NextPageContext
): Promise<Props> => {
  const cookie: Cookie =
    cookies(context).access ||
    (context.query.access && JSON.parse(`${context.query.access}`)) ||
    '';
  let display_name: string = '';

  await axios
    .get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: cookie && `${cookie.token_type} ${cookie.access_token}`,
      },
    })
    .then((res) => {
      display_name = res.data.display_name;
    })
    .catch((e) => console.log(e.response.data));

  return { display_name };
};

export default SpotifyApp;
