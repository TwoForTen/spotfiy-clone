import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';

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
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 0;
    opacity: 0.3;
    filter: grayscale(100%);
  }
`;

const Title = styled.h2`
  color: ${({ theme }: ThemeProp) => theme.colors.common.white};
  padding: 25px;
  text-align: center;
  z-index: 1;
`;

const MobileSupportMessage: React.FC = (): JSX.Element => {
  return (
    <Background>
      <Title>This app is not supported on mobile.</Title>
    </Background>
  );
};

export default MobileSupportMessage;
