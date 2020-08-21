import StyledHeader from './StyledHeader';
import UserDisplay from './UserDisplay';
import Navigation from './Navigation';

interface Props {
  username: string;
}

const Header: React.FC<Props> = ({ username }): JSX.Element => {
  return (
    <StyledHeader>
      <Navigation />
      <UserDisplay username={username} />
    </StyledHeader>
  );
};

export default Header;
