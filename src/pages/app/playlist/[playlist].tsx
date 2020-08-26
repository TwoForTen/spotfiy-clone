import { NextPage, NextPageContext } from 'next';
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
  followers: number;
  tracks: [];
  type: string;
};

interface Props {
  playlist: PlaylistType;
}

const Playlist: NextPage<Props> = ({ playlist }): JSX.Element => {
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
    followers: 0,
    tracks: [],
    type: '',
  };

  await axiosInstance(cookie.access_token)
    .get(`/playlists/${context.query.playlist}`)
    .then((res) => {
      playlist = {
        id: res.data.id,
        imageUrl: res.data.images[0].url,
        name: res.data.name,
        description: res.data.description,
        owner: res.data.owner.display_name,
        followers: res.data.followers.total,
        tracks: res.data.tracks.items,
        type: res.data.type,
      };
    });

  return { playlist };
};

export default Playlist;
