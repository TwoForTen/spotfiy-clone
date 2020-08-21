import { useEffect, useState } from 'react';
import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { AccessState } from 'src/store/access/types';
import { GlobalState } from 'src/store';

import Header from 'src/components/Header';
import Sidebar from 'src/components/Sidebar';

const SpotifyApp: NextPage = (): JSX.Element | null => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');

  const accessToken = useSelector<GlobalState, AccessState['access_token']>(
    (state: GlobalState) => state.access.access_token
  );

  useEffect(() => {
    if (!!!accessToken) {
      router.push('/');
    } else {
      axios
        .get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => setUsername(res.data.display_name))
        .catch(() => {});
    }
  }, [accessToken]);

  if (!!!accessToken) return null;

  return (
    <>
      <Header username={username} />
      <Sidebar />
    </>
  );
};

export default SpotifyApp;
