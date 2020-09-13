import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import useAuth from 'src/hooks/useAuth';

const Auth: React.FC = ({ children }): JSX.Element => {
  const [cookie] = useCookies();
  const [error, setError] = useState<number>(-1);

  useAuth(error);

  const req = axios.interceptors.request.use((req) => {
    req.headers['Authorization'] = `Bearer ${cookie.access.access_token}`;
    req.baseURL = 'https://api.spotify.com/v1';
    return req;
  });

  const res = axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      setError(err.response.data.error.status);
    }
  );

  useEffect(() => {
    return () => {
      axios.interceptors.response.eject(res);
      axios.interceptors.request.eject(req);
    };
  });
  return <>{children}</>;
};

export default Auth;
