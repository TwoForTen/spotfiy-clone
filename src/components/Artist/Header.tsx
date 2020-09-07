import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';
import { ArtistInfo } from 'src/pages/app/artist/[artist]';

interface Props {
  info: ArtistInfo;
}

interface StyleProps {
  $bgImage?: string;
}

const BackgroundImage = styled.div`
  width: ${({ theme }: ThemeProp) =>
    `calc(${theme.shape.ui.header.width} - ${theme.shape.ui.sidebar.width})`};
  height: 400px;
  background-image: ${({ $bgImage }: StyleProps) => `url(${$bgImage})`};
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  position: absolute;
  top: 0;
  right: 0;
  overflow: hidden;
  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: ${({ $bgImage }: StyleProps) => `url(${$bgImage})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: blur(40px);
    z-index: -1;
  }
  &:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    z-index: 1;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-end;
  margin: 0px 35px;
  padding-bottom: 35px;
  position: relative;
  z-index: 2;
`;

const Title = styled.h1`
  color: ${({ theme }: ThemeProp) => theme.colors.common.white};
  font-size: 90px;
`;

const Description = styled.small`
  color: ${({ theme }: ThemeProp) => theme.colors.common.white};
  font-weight: 600;
  font-size: 13px;
  margin-top: 20px;
`;

const Header: React.FC<Props> = ({ info }): JSX.Element => {
  return (
    <BackgroundImage $bgImage={info.imageUrl}>
      <HeaderContainer>
        <div>
          <Description>{info.type?.toUpperCase()}</Description>
          <Title>{info.name}</Title>
          <Description>
            {new Intl.NumberFormat('en-US').format(info.followers)} monthly
            listeners
          </Description>
        </div>
      </HeaderContainer>
    </BackgroundImage>
  );
};

export default Header;
