import styled, { DefaultTheme } from 'styled-components';
import { StyleProps } from 'src/interfaces/StyleProps';

interface Props {
  username: string;
}

const StyledUserDisplay = styled.button`
  height: 32px;
  padding: 2px;
  width: fit-content;
  display: flex;
  justify-content: space-around;
  background-color: ${({ theme }: StyleProps) => theme.colors.common.black};
  align-items: center;
  border-radius: 23px;
  cursor: pointer;
  color: inherit;
`;

const StyledUsername = styled.span`
  margin: 0px 6px;
  font-weight: bold;
`;

const UserDisplay: React.FC<Props> = ({ username }): JSX.Element => {
  return (
    <StyledUserDisplay>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#333"
        width="30px"
        height="30px"
      >
        <path d="M0 0h24v24H0z" fill="none" />
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
    </StyledUserDisplay>
  );
};

export default UserDisplay;
