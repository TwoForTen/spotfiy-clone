import StyledHeader from './StyledHeader';
import UserDisplay from './UserDisplay';
import Navigation from './Navigation';
import Search from './Search';
import { useRouter } from 'next/router';

const Header: React.FC = (): JSX.Element => {
  const router = useRouter();
  return (
    <StyledHeader>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Navigation />
        {router.pathname === '/app/search' && <Search />}
      </div>
      <UserDisplay />
    </StyledHeader>
  );
};

export default Header;
