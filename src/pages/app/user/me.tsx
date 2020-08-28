import { NextPage, NextPageContext } from 'next';
import { PlaylistType } from '../[playlistType]/[playlist]';
import Header from 'src/components/Playlist/Header';
import Browse from 'src/components/HomepageBrowse';
import { BrowsePlaylist } from '../index';
import { Cookie } from 'src/interfaces/Cookie';
import cookies from 'next-cookies';
import axiosInstance from 'src/axiosInstance';
import axios from 'axios';
import HomepageBrowse from 'src/components/HomepageBrowse';

interface Props {
  playlist: PlaylistType;
  playlists: BrowsePlaylist;
}

const Profile: NextPage<Props> = ({ playlist, playlists }): JSX.Element => {
  return (
    <>
      <Header playlist={playlist} />
      <HomepageBrowse playlist={playlists} />
    </>
  );
};

Profile.getInitialProps = async (context: NextPageContext): Promise<Props> => {
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
    playlistCount: 0,
    type: undefined,
  };
  let playlists: BrowsePlaylist = {
    items: [],
    description: {
      title: '',
    },
  };

  const getUser = () => axiosInstance(cookie.access_token).get('/me');
  const getUserPlaylists = () =>
    axiosInstance(cookie.access_token).get('/me/playlists');

  await axios.all([getUser(), getUserPlaylists()]).then(
    axios.spread((user, userPlaylists) => {
      playlist = {
        id: user.data.id,
        imageUrl: user.data?.images[0]?.url ? user.data.images[0].url : '',
        name: user.data.display_name,
        description: '',
        owner: '',
        playlistCount: userPlaylists.data.items.length,
        type: user.data.type,
      };
      playlists = {
        items: userPlaylists.data.items.map((item: any) => {
          return {
            id: item.id,
            name: item.name,
            imageUrl: item.images[0].url,
            description: item.type,
            type: item.type,
          };
        }),
        description: {
          title: 'Your playlists',
        },
      };
    })
  );

  return { playlist, playlists };
};

export default Profile;
