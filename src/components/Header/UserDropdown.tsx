import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

import { ThemeProp } from 'src/interfaces/ThemeProp';

const StyledUserDropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: ${({ theme }: ThemeProp) => theme.colors.common.faded};
  border-radius: ${({ theme }: ThemeProp) => theme.shape.borderRadius};
  min-width: 150px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.6);
  text-align: left;
  color: ${({ theme }: ThemeProp) => theme.colors.ui.text};
  overflow: hidden;
`;

const MenuLink = styled.li`
  width: 100%;
  height: 100%;
  padding: 15px;
  font-weight: 600;
  border-bottom: 1px solid #333;
  &:hover {
    background-color: #333;
    color: ${({ theme }: ThemeProp) => theme.colors.common.white};
  }
`;

const UserDropdown: React.FC = (): JSX.Element => {
  const router = useRouter();
  const [, , removeCookie] = useCookies();
  return (
    <StyledUserDropdown>
      <ul>
        <MenuLink>Profile</MenuLink>
        <MenuLink
          onClick={() => {
            removeCookie('access');
            router.replace('/');
          }}
        >
          Log out
        </MenuLink>
      </ul>
    </StyledUserDropdown>
  );
};

export default UserDropdown;
