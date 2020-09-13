import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useLogout from 'src/hooks/useLogout';

const useAuth = (error: number | null): void => {
  const router = useRouter();
  const logout = useLogout();
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
  }, [error]);
};

export default useAuth;
