import { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import querystring from 'querystring';
import axios from 'axios';
import Login from 'src/components/Login';
import cookies from 'next-cookies';
import { useCookies } from 'react-cookie';
import moment from 'moment';

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
  const router = useRouter();

  const [, setCookie] = useCookies(['access']);

  useEffect(() => {
    if (!!accessResponse) {
      setCookie('access', JSON.stringify(accessResponse), {
        expires: moment().add(3600, 's').toDate(),
      });
      router.push(`/app?access=${JSON.stringify(accessResponse)}`, '/app');
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
  let accessResponse: any = null;

  if (context.req?.headers.cookie) {
    accessResponse = cookies(context).access;
  }

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
      .catch(() => {}));

  return { accessResponse };
};

export default Home;
