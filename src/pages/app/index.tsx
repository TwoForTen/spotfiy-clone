import { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import cookies from 'next-cookies';
import axios from 'src/axiosInstance';

import Header from 'src/components/Header';
import Sidebar from 'src/components/Sidebar';
import TracksContainer from 'src/components/HomepageBrowse';
import Layout from 'src/components/Layout';

interface Props {
  username: string;
  playlists: UserPlaylists;
  topArtists: BrowsePlaylists;
}

interface Cookie {
  access_token: string;
}

export type UserPlaylists = {
  id: string;
  name: string;
}[];

export type BrowsePlaylists = {
  items: {
    id: string;
    name: string;
    imageUrl: string;
    type?: string;
  }[];
  description: {
    title: string;
    description?: string;
  };
};

const SpotifyApp: NextPage<Props> = ({
  username,
  playlists,
  topArtists,
}): JSX.Element | null => {
  const router = useRouter();

  useEffect(() => {
    if (!!!username) {
      router.push('/');
    }
  }, [username]);

  if (!!!username) return null;

  return (
    <>
      <Header username={username} />
      <Sidebar playlists={playlists} />
      <Layout>
        <TracksContainer topArtists={topArtists} />
      </Layout>
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

  let username: string = '';
  let playlists: UserPlaylists = [];
  let topArtists: BrowsePlaylists = { items: [], description: { title: '' } };

  await axios(cookie.access_token)
    .get('/me')
    .then((res) => {
      username = res.data.display_name;
    })
    .catch(() => {});

  await axios(cookie.access_token)
    .get('/me/playlists')
    .then(
      (res) =>
        (playlists = res.data.items.map((item: any) => {
          return {
            id: item.id,
            name: item.name,
          };
        }))
    )
    .catch(() => {});

  await axios(cookie.access_token)
    .get('/me/top/artists?time_range=long_term&limit=9')
    .then(
      (res) =>
        (topArtists = {
          items: res.data.items.map((item: any) => {
            return {
              id: item.id,
              name: item.name,
              imageUrl: item.images[0].url,
              type: item.type,
            };
          }),
          description: {
            title: 'Your top artists',
          },
        })
    )
    .catch(() => {});

  return { username, playlists, topArtists };
};

export default SpotifyApp;
