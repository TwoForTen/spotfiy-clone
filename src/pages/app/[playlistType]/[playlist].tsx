import { NextPage, NextPageContext } from 'next';
import PlaylistComponent from 'src/components/Playlist';
import cookies from 'next-cookies';
import { TypeOfPlaylist } from 'src/interfaces/PlaylistType';
import useAuth from 'src/hooks/useAuth';
import axiosInstance from 'src/axiosInstance';

import { Cookie } from 'src/interfaces/Cookie';

export type PlaylistType = {
  id: string;
  imageUrl: string;
  name: string;
  description?: string;
  owner?: string;
  followers?: number;
  releaseDate?: string;
  playlistCount?: number;
  tracks: [];
  type: TypeOfPlaylist;
};

interface Props {
  playlist: PlaylistType;
  error: number | null;
}

const Playlist: NextPage<Props> = ({ playlist, error }): JSX.Element | null => {
  useAuth(error);

  if (error) return null;

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
    type: undefined,
  };
  let error: number | null = null;

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
      throw { response: { data: { error: { status: 404 } } } };
    }
  } catch (e) {
    error = e.response.data.error.status;
  }

  return { playlist, error };
};

export default Playlist;
