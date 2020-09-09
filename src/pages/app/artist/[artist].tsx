import { NextPage, NextPageContext } from 'next';
import Layout from 'src/components/Layout';
import cookies from 'next-cookies';
import axios from 'axios';
import axiosInstance from 'src/axiosInstance';

import { Cookie } from 'src/interfaces/Cookie';
import ArtistComponent from 'src/components/Artist';

interface Props {
  info: ArtistInfo;
  topTracks: any[];
}

export interface ArtistInfo {
  id: string;
  name: string;
  followers: number;
  imageUrl: string;
  uri: string;
  type: string;
}

const Artist: NextPage<Props> = ({ info, topTracks }): JSX.Element => {
  return (
    <Layout>
      <ArtistComponent topTracks={topTracks} info={info} />
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

  const getArtistInfo = () =>
    axiosInstance(cookie.access_token).get(`/artists/${context.query.artist}`);

  const getTopTracks = () =>
    axiosInstance(cookie.access_token).get(
      `/artists/${context.query.artist}/top-tracks?country=from_token`
    );

  await axios
    .all([getArtistInfo(), getTopTracks()])
    .then(
      axios.spread((artistInfo, topTracks) => {
        info = {
          id: artistInfo.data.id,
          name: artistInfo.data.name,
          followers: artistInfo.data.followers.total,
          imageUrl: artistInfo.data.images[0]?.url,
          type: artistInfo.data.type,
          uri: artistInfo.data.uri,
        };

        tracks = topTracks.data.tracks;
      })
    )
    .catch((e) => console.log(e.response.data.error.message));

  return { info, topTracks: tracks };
};

export default Artist;
