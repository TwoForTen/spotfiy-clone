import { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import querystring from 'querystring';
import axios from 'axios';
import Login from 'src/components/Login';

import { storeAccess } from 'src/store/access/actions';

interface AccessResponse {
  accessResponse: {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
  } | null;
}

const Home: NextPage<AccessResponse> = ({
  accessResponse,
}): JSX.Element | null => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!!accessResponse) {
      dispatch(storeAccess({ ...accessResponse }));
      router.push('/app');
    }
  }, []);

  if (!!accessResponse) return null;

  return <Login />;
};

Home.getInitialProps = async (
  context: NextPageContext
): Promise<AccessResponse> => {
  const client_id: string = 'e201e606a545454ebf802153eee4e83d';
  const client_secret: string = '82b44aa31c764894b3030fd0f1555591';
  let accessResponse = null;

  context.query?.code &&
    (await axios
      .post(
        'https://accounts.spotify.com/api/token',
        querystring.stringify({
          grant_type: 'authorization_code',
          code: context.query.code,
          redirect_uri: 'http://localhost:3000',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
              'Basic ' +
              new Buffer(client_id + ':' + client_secret).toString('base64'),
          },
        }
      )
      .then((res) => {
        accessResponse = res.data;
      })
      .catch((error) => {
        console.log(error.response.data);
      }));

  return { accessResponse };
};

export default Home;
