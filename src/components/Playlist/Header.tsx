import { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Props } from './index';
import { ThemeProp } from 'src/interfaces/ThemeProp';
import Layout from 'src/components/Layout';
import getAverageRGB, { RGB } from 'src/utils/getAverageRGB';

interface StyleProps extends ThemeProp {
  faded?: boolean;
  bgColor?: RGB;
}

const animateGradient = keyframes`
  from{
    opacity: 1;
  }to{
    opacity: 0;
  }
`;

const StyledHeader = styled.div`
  width: 100%;
  height: 600px;
  background: ${({ theme, bgColor }: StyleProps) =>
    `linear-gradient(rgb(${bgColor?.r}, ${bgColor?.g}, ${bgColor?.b}), #121212)`};
  position: absolute;
  transition: 5s;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    background-color: #121212;
    animation: ${animateGradient} 800ms forwards;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 35px;
`;

const InfoContainer = styled.div`
  margin-top: 10px;
`;

const Description = styled.small`
  color: ${({ theme, faded }: StyleProps) =>
    faded ? theme.colors.ui.text : theme.colors.common.white};
  font-weight: 600;
  font-size: 13px;
  margin-top: 20px;
`;

const Title = styled.h1`
  color: ${({ theme }: ThemeProp) => theme.colors.common.white};
  font-size: 90px;
`;

const ImageContainer = styled.div`
  min-height: 225px;
  min-width: 225px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
  position: relative;
  margin-right: 25px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const Header: React.FC<Props> = ({ playlist }): JSX.Element => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [bgColor, setBgColor] = useState<RGB>({ r: 0, g: 0, b: 0 });

  return (
    <>
      <StyledHeader bgColor={bgColor} />
      <Layout>
        <HeaderContainer>
          <ImageContainer>
            <Image
              ref={imgRef}
              onLoad={() =>
                setBgColor(
                  getAverageRGB(imgRef.current || document.createElement('img'))
                )
              }
              src={playlist.imageUrl}
              alt=""
            />
          </ImageContainer>
          <div>
            <Description>{playlist.type.toUpperCase()}</Description>
            <Title>{playlist.name}</Title>
            <Description faded>{playlist.description}</Description>
            <InfoContainer>
              <Description>{playlist.owner}</Description>{' '}
              <Description faded>
                {playlist.type === 'playlist'
                  ? `· ${new Intl.NumberFormat('en').format(
                      playlist?.followers || 0
                    )} likes`
                  : `· ${playlist.releaseDate.split('-')[0]}`}
              </Description>
            </InfoContainer>
          </div>
        </HeaderContainer>
      </Layout>
    </>
  );
};

export default Header;
