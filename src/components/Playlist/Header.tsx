import { useRef, useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { Props } from './index';
import { ThemeProp } from 'src/interfaces/ThemeProp';
import Layout from 'src/components/Layout';
import getAverageRGB, { RGB } from 'src/utils/getAverageRGB';
import { TypeOfPlaylist } from 'src/interfaces/PlaylistType';

interface StyleProps extends ThemeProp {
  faded?: boolean;
  bgColor?: RGB;
  type?: string;
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
  height: 280px;
  background: ${({ theme, bgColor }: StyleProps) =>
    `linear-gradient(rgb(${bgColor?.r}, ${bgColor?.g}, ${bgColor?.b}), #121212)`};
  position: absolute;
  top: 0;
  left: 0;
  transition: 5s;
  z-index: -1;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    background-color: #121212;
    animation: ${animateGradient} 500ms forwards;
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
  overflow: hidden;
  border-radius: ${({ theme, type }: StyleProps) => type === 'user' && '50%'};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #121212;
`;

interface InfoChildren {
  owner?: string;
  followers?: number;
  releaseDate?: string;
  playlistCount?: number;
}

const getPlaylistInfo = (
  type: TypeOfPlaylist,
  children: InfoChildren
): JSX.Element => {
  switch (type) {
    case 'playlist':
      return (
        <>
          <Description>{children.owner}</Description>{' '}
          <Description faded>
            {`· ${new Intl.NumberFormat('en').format(
              children?.followers || 0
            )} likes`}
          </Description>
        </>
      );
    case 'album':
      return (
        <>
          <Description>{children.owner}</Description>{' '}
          <Description faded>{`· ${
            children.releaseDate?.split('-')[0]
          }`}</Description>
        </>
      );
    case 'user':
      return (
        <Description faded>{children.playlistCount} Playlists</Description>
      );
    default:
      return <></>;
  }
};

const Header: React.FC<Props> = ({ playlist }): JSX.Element => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [bgColor, setBgColor] = useState<RGB>({ r: 0, g: 0, b: 0 });

  const onImageLoad = useCallback(() => {
    setBgColor(getAverageRGB(imgRef.current || document.createElement('img')));
  }, []);

  return (
    <>
      <StyledHeader bgColor={bgColor} />
      {/* <Layout> */}
      <HeaderContainer>
        <ImageContainer type={playlist.type}>
          {playlist.imageUrl !== '' ? (
            <Image
              ref={imgRef}
              onLoad={onImageLoad}
              src={playlist.imageUrl}
              alt=""
            />
          ) : (
            <ImagePlaceholder>
              <svg
                width="70"
                height="71"
                viewBox="0 0 80 81"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Playlist Icon</title>
                <path
                  d="M25.6 11.565v45.38c-2.643-3.27-6.68-5.37-11.2-5.37-7.94 0-14.4 6.46-14.4 14.4s6.46 14.4 14.4 14.4 14.4-6.46 14.4-14.4v-51.82l48-10.205V47.2c-2.642-3.27-6.678-5.37-11.2-5.37-7.94 0-14.4 6.46-14.4 14.4s6.46 14.4 14.4 14.4S80 64.17 80 56.23V0L25.6 11.565zm-11.2 65.61c-6.176 0-11.2-5.025-11.2-11.2 0-6.177 5.024-11.2 11.2-11.2 6.176 0 11.2 5.023 11.2 11.2 0 6.174-5.026 11.2-11.2 11.2zm51.2-9.745c-6.176 0-11.2-5.024-11.2-11.2 0-6.174 5.024-11.2 11.2-11.2 6.176 0 11.2 5.026 11.2 11.2 0 6.178-5.026 11.2-11.2 11.2z"
                  fill="white"
                  fillRule="evenodd"
                ></path>
              </svg>
            </ImagePlaceholder>
          )}
        </ImageContainer>
        <div>
          <Description>{playlist.type?.toUpperCase()}</Description>
          <Title>{playlist.name}</Title>
          <Description faded>{playlist.description}</Description>
          <InfoContainer>
            {getPlaylistInfo(playlist.type, playlist)}
          </InfoContainer>
        </div>
      </HeaderContainer>
      {/* </Layout> */}
    </>
  );
};

export default Header;
