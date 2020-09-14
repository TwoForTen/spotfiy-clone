import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useLogout from 'src/hooks/useLogout';
import axios from 'axios';

const useAuth = (error: number | null): void => {
  const router = useRouter();
  const logout = useLogout();
  const res = axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      error = err.response.data.error.status;
    }
  );

  useEffect(() => {
    if (error) {
      switch (error) {
        case 401:
          logout();
          break;
        case 404:
          router.push('/404');
          break;
        case 403:
          alert('Premium required!');
        default:
          break;
      }
    }

    return () => {
      axios.interceptors.response.eject(res);
    };
  }, [error, res]);
};

export default useAuth;
