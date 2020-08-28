import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useAuth = (error: number | null) => {
  const router = useRouter();
  useEffect(() => {
    if (error) {
      switch (error) {
        case 401:
          router.replace('/');
          break;
        case 404:
          router.push('/app/404');
        default:
          break;
      }
    }
  }, [error]);
};

export default useAuth;
