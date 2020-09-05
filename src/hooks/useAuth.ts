import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useAuth = (error: number | null): void => {
  const router = useRouter();
  useEffect(() => {
    if (error) {
      switch (error) {
        case 401:
          router.replace('/');
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
