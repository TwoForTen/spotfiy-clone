import { useEffect } from 'react';
import axios from 'axios';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import cookies from 'next-cookies';

import Header from 'src/components/Header';
import Sidebar from 'src/components/Sidebar';

interface Props {
  display_name: string;
  playlists: Playlists;
}

interface Cookie {
  access_token: string;
  token_type: string;
}

export type Playlists = {
  id: string;
  href: string;
  name: string;
}[];

const SpotifyApp: NextPage<Props> = ({
  display_name,
  playlists,
}): JSX.Element | null => {
  const router = useRouter();

  console.log(playlists);

  useEffect(() => {
    if (!!!display_name) {
      router.push('/');
    }
  }, [display_name]);

  if (!!!display_name) return null;

  return (
    <>
      <Header username={display_name} />
      <Sidebar playlists={playlists} />
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
  let playlists: Playlists = [];

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

  await axios
    .get('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: cookie && `${cookie.token_type} ${cookie.access_token}`,
      },
    })
    .then(
      (res) =>
        (playlists = res.data.items.map((item: any) => {
          return {
            id: item.id,
            href: item.href,
            name: item.name,
          };
        }))
    );

  return { display_name, playlists };
};

export default SpotifyApp;
