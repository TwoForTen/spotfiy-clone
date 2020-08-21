import { useState } from 'react';
import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';
import UserDropdown from './UserDropdown';

interface Props {
  username: string;
}

interface StyleProps extends ThemeProp {
  clicked?: boolean;
}

const StyledUserDisplay = styled.button`
  position: relative;
  height: 32px;
  padding: 2px;
  width: fit-content;
  display: flex;
  justify-content: space-around;
  background-color: ${({ theme, clicked }: StyleProps) =>
    !clicked ? theme.colors.common.black : theme.colors.common.faded};
  align-items: center;
  border-radius: 23px;
  cursor: pointer;
  color: inherit;
  &:hover {
    background-color: ${({ theme }: ThemeProp) => theme.colors.common.faded};
  }

  svg:last-of-type {
    transform: ${({ theme, clicked }: StyleProps) =>
      clicked && 'rotate(180deg)'};
  }
`;

const StyledUsername = styled.span`
  margin: 0px 6px;
  font-weight: bold;
`;

const UserDisplay: React.FC<Props> = ({ username }): JSX.Element => {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <StyledUserDisplay
      clicked={clicked}
      onClick={() => setClicked((prevState): boolean => !prevState)}
      onBlur={() => setClicked(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#333"
        width="30px"
        height="30px"
      >
        <circle cx="12" cy="12" r="8" fill="white" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
      </svg>
      <StyledUsername>{username}</StyledUsername>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M7 10l5 5 5-5z" fill="white" />
      </svg>
      {clicked && <UserDropdown />}
    </StyledUserDisplay>
  );
};

export default UserDisplay;
