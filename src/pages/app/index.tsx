import { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import cookies from 'next-cookies';
import axiosInstance from 'src/axiosInstance';
import axios from 'axios';

import HomepageBrowse from 'src/components/HomepageBrowse';
import { TypeOfPlaylist } from 'src/interfaces/PlaylistType';

import { Cookie } from 'src/interfaces/Cookie';

interface Props {
  browsePlaylists: BrowsePlaylist[];
  error: boolean;
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
  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.push('/');
    }
  }, [error]);

  if (error) return null;

  return (
    <>
      {browsePlaylists.map((playlist, index) => {
        return <HomepageBrowse playlist={playlist} key={index} />;
      })}
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

  const browsePlaylists: BrowsePlaylist[] = [];
  let error: boolean = false;

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
      getUserTopArtists(),
      getUserTopTracks(),
      getFeatured(),
      getNewReleases(),
    ])
    .then(
      axios.spread((topArtists, topTracks, featured, newReleases) => {
        // Push All Browse Playlists
        browsePlaylists.push(
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
          },
          {
            items: topTracks.data.items.map((item: any) => {
              return {
                id: item.id,
                name: item.name,
                imageUrl: item.album.images[0].url,
                description: item.type,
                type: item.type,
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
          }
        );
      })
    )
    .catch(() => {
      error = true;
    });

  return { browsePlaylists, error };
};

export default SpotifyApp;
