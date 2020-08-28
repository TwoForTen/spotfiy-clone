import { useRouter } from 'next/router';
import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';

const StyledNavigation = styled.div`
  display: flex;
  z-index: 1;
`;

const StyledHeaderButton = styled.button`
  width: fit-content;
  height: fit-content;
  padding: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ theme }: ThemeProp) => theme.colors.common.black};
`;

const Navigation: React.FC = (): JSX.Element => {
  const router = useRouter();
  return (
    <StyledNavigation>
      <StyledHeaderButton>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="30px"
          height="30px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
        </svg>
      </StyledHeaderButton>
      <StyledHeaderButton style={{ marginLeft: '14px' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="30px"
          height="30px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
        </svg>
      </StyledHeaderButton>
    </StyledNavigation>
  );
};

export default Navigation;
