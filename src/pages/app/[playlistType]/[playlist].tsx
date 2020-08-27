import { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import PlaylistComponent from 'src/components/Playlist';
import cookies from 'next-cookies';

import axiosInstance from 'src/axiosInstance';

import { Cookie } from 'src/interfaces/Cookie';

export type PlaylistType = {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  owner: string;
  followers?: number;
  releaseDate: string;
  tracks: [];
  type: string;
};

interface Props {
  playlist: PlaylistType;
  error: boolean;
}

const Playlist: NextPage<Props> = ({ playlist, error }): JSX.Element => {
  const router = useRouter();
  useEffect(() => {
    if (error) router.push('/app/404', '/app/404');
  }, [error]);

  return <PlaylistComponent playlist={playlist} />;
};

Playlist.getInitialProps = async (context: NextPageContext): Promise<Props> => {
  const cookie: Cookie =
    cookies(context).access ||
    (context.query.access && JSON.parse(`${context.query.access}`)) ||
    '';

  let playlist: PlaylistType = {
    id: '',
    imageUrl: '',
    name: '',
    description: '',
    owner: '',
    releaseDate: '',
    tracks: [],
    type: '',
  };
  let error: boolean = false;

  try {
    if (
      context.query.playlistType === 'playlist' ||
      context.query.playlistType === 'album'
    ) {
      const res = await axiosInstance(cookie.access_token).get(
        `/${context.query.playlistType + 's'}/${context.query.playlist}`
      );
      playlist = {
        id: res.data.id,
        imageUrl: res.data.images[0].url,
        name: res.data.name,
        description:
          context.query.playlistType === 'playlist' ? res.data.description : '',
        owner:
          context.query.playlistType === 'playlist'
            ? res.data.owner.display_name
            : res.data.artists[0].name,
        followers:
          context.query.playlistType === 'playlist' && res.data.followers.total,
        releaseDate: res.data.release_date,
        tracks: res.data.tracks.items,
        type: res.data.type,
      };
    } else {
      throw new Error('Invalid route');
    }
  } catch (e) {
    error = true;
  }

  return { playlist, error };
};

export default Playlist;
