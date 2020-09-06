import StyledHeader from './StyledHeader';
import UserDisplay from './UserDisplay';
import Navigation from './Navigation';

const Header: React.FC = (): JSX.Element => {
  return (
    <StyledHeader>
      <Navigation />
      <UserDisplay />
    </StyledHeader>
  );
};

export default Header;
