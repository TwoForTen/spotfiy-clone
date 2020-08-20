import { useRouter } from 'next/router';

interface Props {
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<Props> = ({
  component: Component,
  ...rest
}): JSX.Element => {
  const router = useRouter();
  const ACCESS_TOKEN = JSON.parse(localStorage.get('ACCESS_TOKEN'));

  if (!ACCESS_TOKEN) {
    router.push('/');
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
