import { NextPage, NextPageContext } from 'next';
import Layout from 'src/components/Layout';
import cookies from 'next-cookies';
import axios from 'axios';
import axiosInstance from 'src/axiosInstance';
import useAuth from 'src/hooks/useAuth';
import { Cookie } from 'src/interfaces/Cookie';
import ArtistComponent from 'src/components/Artist';

interface Props {
  info: ArtistInfo;
  topTracks: any[];
  albums: ArtistAlbum[];
  error: number;
}

export interface ArtistInfo {
  id: string;
  name: string;
  followers: number;
  imageUrl: string;
  uri: string;
  type: string;
}

export interface ArtistAlbum {
  albumGroup: string;
  type: string;
  name: string;
  id: string;
  artist: any;
  imageUrl: string;
}

const Artist: NextPage<Props> = ({
  info,
  topTracks,
  albums,
  error,
}): JSX.Element | null => {
  useAuth(error);
  if (error) return null;
  return (
    <Layout>
      <ArtistComponent topTracks={topTracks} info={info} albums={albums} />
    </Layout>
  );
};

Artist.getInitialProps = async (context: NextPageContext) => {
  const cookie: Cookie =
    cookies(context).access ||
    (context.query.access && JSON.parse(`${context.query.access}`)) ||
    '';

  let info: ArtistInfo = {
    id: '',
    name: '',
    followers: -1,
    imageUrl: '',
    type: '',
    uri: '',
  };
  let tracks: any[] = [];
  let albums: ArtistAlbum[] = [];
  let error: number = 0;

  const getArtistInfo = () =>
    axiosInstance(cookie.access_token).get(`/artists/${context.query.artist}`);

  const getTopTracks = () =>
    axiosInstance(cookie.access_token).get(
      `/artists/${context.query.artist}/top-tracks?country=from_token`
    );

  const getAlbums = () =>
    axiosInstance(cookie.access_token).get(
      `/artists/${context.query.artist}/albums?limit=50`
    );

  await axios
    .all([getArtistInfo(), getTopTracks(), getAlbums()])
    .then(
      axios.spread((artistInfo, topTracks, artistAlbums) => {
        info = {
          id: artistInfo.data.id,
          name: artistInfo.data.name,
          followers: artistInfo.data.followers.total,
          imageUrl: artistInfo.data.images[0]?.url,
          type: artistInfo.data.type,
          uri: artistInfo.data.uri,
        };

        tracks = topTracks.data.tracks;

        albums = [
          ...artistAlbums.data.items.map((item: any) => {
            return {
              id: item.id,
              albumGroup: item.album_group,
              name: item.name,
              type: item.type,
              artist: item.artists[0],
              imageUrl: item.images[0].url,
            };
          }),
        ];
      })
    )
    .catch((e) => (error = e.response.data.error.status));

  return { info, topTracks: tracks, albums, error };
};

export default Artist;
