import { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import cookies from 'next-cookies';
import axiosInstance from 'src/axiosInstance';
import axios from 'axios';

import Header from 'src/components/Header';
import Sidebar from 'src/components/Sidebar';
import HomepageBrowse from 'src/components/HomepageBrowse';
import Layout from 'src/components/Layout';

interface Props {
  username: string;
  userPlaylists: UserPlaylists;
  browsePlaylists: BrowsePlaylist[];
}

interface Cookie {
  access_token: string;
}

export type UserPlaylists = {
  id: string;
  name: string;
}[];

export type BrowsePlaylist = {
  items: {
    id: string;
    name: string;
    imageUrl: string;
    description?: string;
  }[];
  description: {
    title: string;
    description?: string;
  };
};

const SpotifyApp: NextPage<Props> = ({
  username,
  userPlaylists,
  browsePlaylists,
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
      <Sidebar playlists={userPlaylists} />
      <Layout>
        {browsePlaylists.map((playlist, index) => {
          return <HomepageBrowse playlist={playlist} key={index} />;
        })}
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
  let userPlaylists: UserPlaylists = [];
  const browsePlaylists: BrowsePlaylist[] = [];

  const getUser = () => axiosInstance(cookie.access_token).get('/me');

  const getUserPlaylists = () =>
    axiosInstance(cookie.access_token).get('/me/playlists');

  const getUserTopArtists = () =>
    axiosInstance(cookie.access_token).get(
      '/me/top/artists?time_range=long_term&limit=8'
    );

  const getUserTopTracks = () =>
    axiosInstance(cookie.access_token).get(
      '/me/top/tracks?time_range=long_term&limit=8'
    );

  const getFeatured = () =>
    axiosInstance(cookie.access_token).get(
      'https://api.spotify.com/v1/browse/featured-playlists?limit=8&locale=en_US&country=hr'
    );

  const getNewReleases = () =>
    axiosInstance(cookie.access_token).get(
      'https://api.spotify.com/v1/browse/new-releases?limit=8'
    );

  await axios
    .all([
      getUser(),
      getUserPlaylists(),
      getUserTopArtists(),
      getUserTopTracks(),
      getFeatured(),
      getNewReleases(),
    ])
    .then(
      axios.spread(
        (user, playlists, topArtists, topTracks, featured, newReleases) => {
          // Set username
          username = user.data.display_name;

          // Set User's Playlists for Sidebar
          userPlaylists = playlists.data.items.map((item: any) => {
            return {
              id: item.id,
              name: item.name,
            };
          });

          // Push All Browse Playlists
          browsePlaylists.push(
            {
              items: topArtists.data.items.map((item: any) => {
                return {
                  id: item.id,
                  name: item.name,
                  imageUrl: item.images[0].url,
                  description: item.type,
                };
              }),
              description: {
                title: 'Your top artists',
              },
            },
            {
              items: topTracks.data.items.map((item: any) => {
                return {
                  id: item.id,
                  name: item.name,
                  imageUrl: item.album.images[0].url,
                  description: item.type,
                };
              }),
              description: {
                title: 'Your top tracks',
                description: "They're on the top for a reason.",
              },
            },
            {
              items: featured.data.playlists.items.map((item: any) => {
                return {
                  id: item.id,
                  name: item.name,
                  imageUrl: item.images[0].url,
                  description: item.description,
                };
              }),
              description: {
                title: featured.data.message,
              },
            },
            {
              items: newReleases.data.albums.items.map((item: any) => {
                return {
                  id: item.id,
                  name: item.name,
                  imageUrl: item.images[0].url,
                  description: item.artists[0].name,
                };
              }),
              description: {
                title: 'New releases',
              },
            }
          );
        }
      )
    )
    .catch(() => {});

  return { username, userPlaylists, browsePlaylists };
};

export default SpotifyApp;
