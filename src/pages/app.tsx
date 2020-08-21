import { useEffect } from 'react';
import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { AccessState } from 'src/store/access/types';
import { GlobalState } from 'src/store';

import Header from 'src/components/Header/Header';

const SpotifyApp: NextPage = (): JSX.Element | null => {
  const router = useRouter();

  const accessToken = useSelector<GlobalState, AccessState['access_token']>(
    (state: GlobalState) => state.access.access_token
  );

  useEffect(() => {
    if (!!!accessToken) {
      router.push('/');
    }

    axios
      .get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => console.log(res.data));
  }, [accessToken]);

  if (!!!accessToken) return null;

  return (
    <>
      <Header username="twoforten" />
    </>
  );
};

export default SpotifyApp;
