import { NextPage, NextPageContext } from 'next';
import cookies from 'next-cookies';
import axiosInstance from 'src/axiosInstance';
import axios from 'axios';
import Layout from 'src/components/Layout';
import useAuth from 'src/hooks/useAuth';

import HomepageBrowse from 'src/components/HomepageBrowse';
import { TypeOfPlaylist } from 'src/interfaces/PlaylistType';

import { Cookie } from 'src/interfaces/Cookie';

interface Props {
  browsePlaylists: BrowsePlaylist[];
  error: number | null;
}

export type BrowsePlaylist = {
  items: {
    id: string;
    name: string;
    imageUrl: string;
    description?: string;
    type: TypeOfPlaylist;
  }[];
  description: {
    title: string;
    description?: string;
  };
};

const SpotifyApp: NextPage<Props> = ({
  browsePlaylists,
  error,
}): JSX.Element | null => {
  useAuth(error);

  if (error) return null;

  return (
    <Layout>
      {browsePlaylists.map((playlist, index) => {
        return <HomepageBrowse playlist={playlist} key={index} />;
      })}
    </Layout>
  );
};

SpotifyApp.getInitialProps = async (
  context: NextPageContext
): Promise<Props> => {
  const cookie: Cookie =
    cookies(context).access ||
    (context.query.access && JSON.parse(`${context.query.access}`)) ||
    '';

  const categories: string[] = [
    'toplists',
    'summer',
    'at_home',
    'mood',
    'pop',
    'hiphop',
    'edm_dance',
    'indie_alt',
    'party',
    'chill',
    'wellness',
    'focus',
    'workout',
    'soul',
    'sleep',
    'rock',
    'dinner',
    'rnb',
    'roots',
    'romance',
    'travel',
    'sessions',
    'metal',
    'kpop',
    'gaming',
    'anime',
    'popculture',
  ];

  const categoryList: string[] = [];

  for (let i = 0; i < 5; i++) {
    const categoryIndex = Math.floor(Math.random() * categories.length);
    categoryList.push(categories[categoryIndex]);
    categories.splice(categoryIndex, 1);
  }

  const browsePlaylists: BrowsePlaylist[] = [];
  let error: number | null = null;

  const getCategoryPlaylists = () => {
    const promises = [];
    for (const category of categoryList) {
      promises.push(
        axiosInstance(cookie.access_token).get(
          `/browse/categories/${category}/playlists?limit=9`
        )
      );
    }

    return promises;
  };

  const getUserTopArtists = () =>
    axiosInstance(cookie.access_token).get(
      '/me/top/artists?time_range=long_term&limit=9'
    );

  const getFeatured = () =>
    axiosInstance(cookie.access_token).get(
      'https://api.spotify.com/v1/browse/featured-playlists?limit=9&locale=en_US'
    );

  const getNewReleases = () =>
    axiosInstance(cookie.access_token).get(
      'https://api.spotify.com/v1/browse/new-releases?limit=9'
    );

  await axios
    .all([
      getUserTopArtists(),
      getFeatured(),
      getNewReleases(),
      ...getCategoryPlaylists(),
    ])
    .then(
      axios.spread((topArtists, featured, newReleases, ...rest) => {
        console.log(rest);
        // Push All Browse Playlists
        browsePlaylists.push(
          ...rest.map(
            (category): BrowsePlaylist => {
              return {
                items: category.data.playlists.items.map((item: any) => {
                  return {
                    id: item.id,
                    name: item.name,
                    imageUrl: item.images[0].url,
                    description: item.description,
                    type: item.type,
                  };
                }),
                description: {
                  title: 'a',
                },
              };
            }
          ),
          {
            items: featured.data.playlists.items.map((item: any) => {
              return {
                id: item.id,
                name: item.name,
                imageUrl: item.images[0].url,
                description: item.description,
                type: item.type,
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
                type: item.type,
              };
            }),
            description: {
              title: 'New releases',
            },
          },
          {
            items: topArtists.data.items.map((item: any) => {
              return {
                id: item.id,
                name: item.name,
                imageUrl: item.images[0].url,
                description: item.type,
                type: item.type,
              };
            }),
            description: {
              title: 'Your top artists',
            },
          }
        );
      })
    )
    .catch((e) => {
      error = e.response.data.error.status;
    });

  return { browsePlaylists, error };
};

export default SpotifyApp;
