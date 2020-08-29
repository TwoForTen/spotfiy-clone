import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';
import moment from 'moment';

interface Props {
  track: any;
  index: number;
}

const TrackContainer = styled.div`
  display: grid;
  grid-template-columns: 20px 4fr 3fr 30px;
  grid-gap: 20px;
  width: 100%;
  padding: 15px;
  height: 60px;
  align-items: center;
  position: relative;
`;

const ImageContainer = styled.div`
  height: 40px;
  width: 40px;
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
`;

const TrackTitle = styled.h5`
  color: ${({ theme }: ThemeProp) => theme.colors.common.white};
  font-weight: 400;
  font-size: 15px;
`;

const TrackInfo = styled.span`
  color: ${({ theme }: ThemeProp) => theme.colors.ui.text};
  font-size: 13px;
`;

const Track: React.FC<Props> = ({ track, index }): JSX.Element => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (imgRef.current?.complete) setImgLoaded(true);
  }, []);

  return (
    <TrackContainer>
      <TrackInfo style={{ fontSize: '16px', textAlign: 'right' }}>
        {index}
      </TrackInfo>
      <TrackInfoContainer>
        <ImageContainer>
          <Image
            loading="lazy"
            ref={imgRef}
            src={track.album.images[0].url}
            alt=""
            onLoad={() => setImgLoaded(true)}
            style={{ visibility: imgLoaded ? 'visible' : 'hidden' }}
          />
          {!imgLoaded && <ImageSkeleton />}
        </ImageContainer>
        <div>
          <TrackTitle>{track.name}</TrackTitle>
          <TrackInfo>
            {track.artists.map((artist: any) => artist.name).join(', ')}
          </TrackInfo>
        </div>
      </TrackInfoContainer>
      <TrackInfo>{track.album.name}</TrackInfo>
      <TrackInfo style={{ textAlign: 'right' }}>
        {moment(track.duration_ms).format('m:ss')}
      </TrackInfo>
    </TrackContainer>
  );
};

export default Track;
