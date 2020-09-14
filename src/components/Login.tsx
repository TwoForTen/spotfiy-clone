import styled, { DefaultTheme, css } from 'styled-components';

interface ThemeProp {
  theme: DefaultTheme;
}

const Background = styled.div`
  width: 100vw;
  height: 100vh;
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
    opacity: 0.3;
    filter: grayscale(100%);
  }
`;

const Title = styled.h2`
  color: ${({ theme }: ThemeProp) => theme.colors.common.white};
  z-index: 1;
`;

const Button = styled.button`
  ${({ theme }: ThemeProp) => css`
    border: none;
    outline: none;
    padding: 10px;
    margin: 20px;
    min-width: 120px;
    color: ${theme.colors.common.white};
    font-size: 20px;
    border-radius: ${theme.shape.borderRadius};
    background-color: ${theme.colors.primary.main};
    transition: 300ms;
    z-index: 1;
    &:hover {
      cursor: pointer;
      background-color: ${theme.colors.primary.lighten};
    }
  `}
`;

const Login: React.FC = (): JSX.Element => {
  return (
    <Background>
      <Title>Login to Spotify to continue</Title>
      <a
        style={{ zIndex: 1 }}
        href={`https://accounts.spotify.com/authorize?client_id=e201e606a545454ebf802153eee4e83d&redirect_uri=https://spotify-minimal-clone.herokuapp.com/&scope=user-read-private%20user-read-email%20user-top-read%20user-modify-playback-state%20playlist-modify-public%20playlist-modify-private%20user-read-playback-state%20streaming&response_type=code&state=129873`}
      >
        <Button>Login</Button>
      </a>
    </Background>
  );
};

export default Login;
