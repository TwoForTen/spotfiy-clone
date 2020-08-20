import styled, { DefaultTheme } from 'styled-components';
import Button from 'src/components/StyledButton';

interface StyleProps {
  theme: DefaultTheme;
}

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }: StyleProps) => theme.colors.common.black};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:before {
    content: '';
    background-image: url('https://developers.spotify.com/images/home/tile-1-alt-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
    opacity: 0.17;
    filter: grayscale(100%);
  }
`;

const Title = styled.h2`
  color: ${({ theme }: StyleProps) => theme.colors.common.white};
  z-index: 1;
`;

const Login: React.FC = (): JSX.Element => {
  return (
    <Background>
      <Title>Login to Spotify to continue</Title>
      <a
        style={{ zIndex: 1 }}
        href="https://accounts.spotify.com/authorize?client_id=6acd672c6265465db9cd34ce4a2381e1&redirect_uri=http://localhost:3000&scope=user-read-private%20user-read-email&response_type=token&state=123"
      >
        <Button primary>Login</Button>
      </a>
    </Background>
  );
};

export default Login;
