import { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';
import { TypeOfPlaylist } from 'src/interfaces/TypeOfPlaylist';
import moment from 'moment';
import axiosInstance from 'src/axiosInstance';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';

import { GlobalState } from 'src/store';
import { PlayingNowState } from 'src/store/PlayingNow/types';

import playingGif from 'src/assets/playingGif.gif';

interface Props {
  track: any;
  index: number;
  type: TypeOfPlaylist;
  onClick: () => void;
  trackSelected: number;
  playlistUri: string;
}

interface StyleProps {
  $trackSelected?: number;
  $index?: number;
}

interface ActiveTrack extends ThemeProp {
  $activeTrack?: boolean;
}

const TrackContainer = styled.div`
  display: grid;
  grid-template-columns: 20px 4fr 3fr 30px;
  grid-gap: 20px;
  width: 100%;
  padding: 0 15px;
  height: 60px;
  align-items: center;
  position: relative;
  border-radius: ${({ theme }: ThemeProp) => theme.shape.borderRadius};
  &:hover {
    background-color: rgba(50, 50, 50, 0.6);
  }
  ${({ $trackSelected, $index }: StyleProps) =>
    $trackSelected === $index &&
    css`
      background-color: rgba(50, 50, 50, 1) !important;
    `}
`;

const ImageContainer = styled.div`
  min-height: 40px;
  min-width: 40px;
  max-height: 40px;
  max-width: 40px;
  margin-right: 15px;
  position: relative;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const ImageSkeleton = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(50, 50, 50, 0.5);
  position: absolute;
  top: 0;
  left: 0;
`;

const TrackInfoContainer = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TrackTitle = styled.h5`
  color: ${({ theme, $activeTrack }: ActiveTrack) =>
    $activeTrack ? theme.colors.primary.main : theme.colors.common.white};
  font-weight: 400;
  font-size: 15px;
`;

const TrackInfo = styled.span`
  color: ${({ theme }: ThemeProp) => theme.colors.ui.text};
  font-size: 13px;
  ${({ $trackSelected, $index }: StyleProps) =>
    $trackSelected === $index &&
    css`
      color: white !important;
    `}
  ${TrackContainer}:hover & {
    color: white;
  }
`;

const Track: React.FC<Props> = ({
  track,
  index,
  type,
  onClick,
  trackSelected,
  playlistUri,
}): JSX.Element => {
  const imgRef = useRef<HTMLImageElement>(null);

  const [cookie] = useCookies(['access']);
  const playingNow = useSelector<GlobalState, PlayingNowState>(
    (state: GlobalState) => state.playingNow
  );
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const [trackHovered, setTrackHovered] = useState<boolean>(false);

  useEffect(() => {
    if (imgRef.current?.complete) setImgLoaded(true);
  }, []);

  const playTrack = () => {
    axiosInstance(cookie.access.access_token).put(
      '/me/player/play?device_id=9f72d6eb8ce3df03cdb63cb36ce81836e6549790',
      {
        context_uri: playlistUri,
        offset: {
          position: index - 1,
        },
        position_ms: playingNow.id === track.id ? playingNow.position : 0,
      }
    );
  };

  return (
    <TrackContainer
      $trackSelected={trackSelected}
      $index={index}
      onClick={onClick}
      onMouseOver={() => setTrackHovered(true)}
      onMouseLeave={() => setTrackHovered(false)}
    >
      {playingNow.id === track.id &&
      (trackHovered || trackSelected === index) &&
      !playingNow.paused ? (
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="22"
            viewBox="0 0 24 24"
            width="22"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="white" />
          </svg>
        </span>
      ) : playingNow.id === track.id ? (
        <img
          style={{ margin: '0 auto', position: 'relative' }}
          src={playingGif}
          alt=""
          width={14}
          height={14}
        />
      ) : trackHovered || trackSelected === index ? (
        <span onClick={playTrack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="22"
            viewBox="0 0 24 24"
            width="22"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M8 5v14l11-7z" fill="white" />
          </svg>
        </span>
      ) : (
        <TrackInfo
          $trackSelected={trackSelected}
          $index={index}
          style={{ fontSize: '16px', textAlign: 'right' }}
        >
          {index}
        </TrackInfo>
      )}
      <TrackInfoContainer>
        {type === 'playlist' && (
          <ImageContainer>
            <Image
              loading="lazy"
              ref={imgRef}
              src={track?.album?.images[0]?.url}
              alt=""
              onLoad={() => setImgLoaded(true)}
              style={{ visibility: imgLoaded ? 'visible' : 'hidden' }}
            />
            {(!imgLoaded || !!!track?.album?.images[0]?.url) && (
              <ImageSkeleton />
            )}
          </ImageContainer>
        )}
        <div>
          <TrackTitle $activeTrack={playingNow.id == track?.id}>
            {track?.name}
          </TrackTitle>
          <TrackInfo $trackSelected={trackSelected} $index={index}>
            {track?.artists?.map((artist: any) => artist?.name).join(', ')}
          </TrackInfo>
        </div>
      </TrackInfoContainer>
      {type === 'playlist' && (
        <TrackInfo $trackSelected={trackSelected} $index={index}>
          {track?.album?.name}
        </TrackInfo>
      )}
      <TrackInfo
        $trackSelected={trackSelected}
        $index={index}
        style={{ textAlign: 'right' }}
      >
        {moment(track?.duration_ms).format('m:ss')}
      </TrackInfo>
    </TrackContainer>
  );
};

export default Track;
