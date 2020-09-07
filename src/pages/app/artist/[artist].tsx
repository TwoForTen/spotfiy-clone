import { NextPage, NextPageContext } from 'next';
import Layout from 'src/components/Layout';
import cookies from 'next-cookies';
import axios from 'axios';
import axiosInstance from 'src/axiosInstance';

import { Cookie } from 'src/interfaces/Cookie';
import ArtistComponent from 'src/components/Artist';

interface Props {
  info: ArtistInfo;
}

export interface ArtistInfo {
  id: string;
  name: string;
  followers: number;
  imageUrl: string;
  uri: string;
  type: string;
}

const Artist: NextPage<Props> = ({ info }): JSX.Element => {
  return (
    <Layout>
      <ArtistComponent info={info} />
    </Layout>
  );
};

Artist.getInitialProps = async (context: NextPageContext) => {
  const cookie: Cookie =
    cookies(context).access ||
    (context.query.access && JSON.parse(`${context.query.access}`)) ||
    '';

  const getArtistInfo = () =>
    axiosInstance(cookie.access_token).get(`/artists/${context.query.artist}`);

  let info: ArtistInfo = {
    id: '',
    name: '',
    followers: -1,
    imageUrl: '',
    type: '',
    uri: '',
  };

  await axios.all([getArtistInfo()]).then(
    axios.spread((artistInfo) => {
      info = {
        id: artistInfo.data.id,
        name: artistInfo.data.name,
        followers: artistInfo.data.followers.total,
        imageUrl: artistInfo.data.images[0]?.url,
        type: artistInfo.data.type,
        uri: artistInfo.data.uri,
      };
    })
  );

  return { info };
};

export default Artist;
