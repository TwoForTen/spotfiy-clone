import { useState } from 'react';
import styled, { css } from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';

interface StyleProps {
  trackAt?: number;
  sliderType?: SliderType;
}

enum SliderType {
  Track = 'TRACK',
  Volume = 'VOLUME',
}

const PlayerContainer = styled.footer<ThemeProp>`
  position: fixed;
  bottom: 0;
  left: 0;
  height: ${({ theme }) => theme.shape.ui.footer.height};
  width: ${({ theme }) => theme.shape.ui.footer.width};
  background-color: ${({ theme }) => theme.colors.ui.footer};
  border-top: 1px solid black;
  z-index: 100;
  padding: 16px;
  display: grid;
  grid-template-columns: minmax(100px, 1fr) 1fr 1fr;
  align-items: center;
`;

const TrackInfoContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  grid-template-columns: 50px auto;
  grid-gap: 10px;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ImageContainer = styled.div`
  min-height: 50px;
  min-width: 50px;
  position: relative;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
`;

const ImageSkeleton = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(50, 50, 50, 0.8);
  position: absolute;
  top: 0;
  left: 0;
`;

const TrackTitle = styled.h5<ThemeProp>`
  color: ${({ theme }) => theme.colors.common.white};
  font-weight: 400;
  font-size: 13px;
`;

const Artists = styled.small<ThemeProp>`
  color: ${({ theme }) => theme.colors.ui.text};
  font-size: 11px;
`;

const TrackControlsContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const PlayButton = styled.button`
  display: flex;
  align-items: center;
  padding: 4px;
  margin: 0 20px;
  background-color: transparent;
  border: 1px solid #999;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    border: 1px solid white;
    transform: scale(1.1);

    > svg > path:last-child {
      fill: white;
    }
  }
`;

const SkipButton = styled.button`
  display: flex;
  align-items: center;
  padding: 4px;
  background-color: transparent;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    > svg > path:last-child {
      fill: white;
    }
  }
`;

const VolumeButton = styled.button`
  display: flex;
  align-items: center;
  padding: 4px;
  background-color: transparent;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    > svg > path:last-child {
      fill: white;
    }
  }
`;

const TrackSliderContainer = styled.div`
  height: 15px;
  display: flex;
  align-items: center;
  width: 100%;
  overflow-x: hidden;
  position: relative;
  border-radius: 100px;
`;

const VolumeControlSlider = styled.div`
  position: relative;
  overflow-x: hidden;
  border-radius: 100px;
  display: flex;
  align-items: center;
  height: 15px;
`;

const TrackSlider = styled.input.attrs(() => ({
  type: 'range',
}))`
  appearance: none;
  height: 5px;
  background-color: rgb(80, 80, 80);
  width: 100%;
  border-radius: 5px;
  &:focus {
    border: none;
    outline: none;
  }
  &::-webkit-slider-thumb {
    appearance: none;
    display: none;
    background-color: white;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    z-index: 1005;
    position: relative;
    ${({ sliderType }: StyleProps) =>
      sliderType === SliderType.Track
        ? css`
            ${TrackSliderContainer}:hover & {
              display: block;
            }
          `
        : sliderType === SliderType.Volume &&
          css`
            ${VolumeControlSlider}:hover & {
              display: block;
            }
          `};
  }
`;

const TrackPlayed = styled.div`
  height: 5px;
  position: absolute;
  background-color: gray;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  margin-left: ${({ trackAt }: StyleProps) => `calc(-100% + ${trackAt}%)`};
  pointer-events: none;
  ${({ sliderType }: StyleProps) =>
    sliderType === SliderType.Track
      ? css`
          ${TrackSliderContainer}:hover & {
            background-color: ${({ theme }: ThemeProp) =>
              theme.colors.primary.main};
          }
        `
      : sliderType === SliderType.Volume &&
        css`
          ${VolumeControlSlider}:hover & {
            background-color: ${({ theme }: ThemeProp) =>
              theme.colors.primary.main};
          }
        `};
`;

const VolumeControlContainer = styled.div`
  display: flex;
  align-items: center;
  justify-self: end;
  height: 100%;
`;

const FooterPlayer: React.FC = (): JSX.Element => {
  const [trackAt, setTrackAt] = useState<number>(0);

  return (
    <PlayerContainer>
      <TrackInfoContainer>
        <ImageContainer>
          <ImageSkeleton />
        </ImageContainer>
        <div>
          <TrackTitle>Track Title Goes Hereeeeeeeeeeeeeerererer</TrackTitle>
          <Artists>Artist1, Artist2</Artists>
        </div>
      </TrackInfoContainer>
      <TrackControlsContainer>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SkipButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" fill="#999" />
            </svg>
          </SkipButton>
          <PlayButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="22"
              viewBox="0 0 24 24"
              width="22"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M8 5v14l11-7z" fill="#999" />
            </svg>
          </PlayButton>
          <SkipButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" fill="#999" />
            </svg>
          </SkipButton>
        </div>
        <TrackSliderContainer>
          <div
            style={{
              overflowY: 'visible',
              width: '100%',
              lineHeight: '0',
              borderRadius: '5px',
            }}
          >
            <TrackSlider
              min={0}
              max={100}
              value={trackAt}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTrackAt(+e.target.value)
              }
              sliderType={SliderType.Track}
            />
            <TrackPlayed trackAt={trackAt} sliderType={SliderType.Track} />
          </div>
        </TrackSliderContainer>
      </TrackControlsContainer>
      <VolumeControlContainer>
        <VolumeButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18"
            viewBox="0 0 24 24"
            width="18"
            style={{ marginRight: '8px' }}
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fill="#999"
              d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
            />
          </svg>
        </VolumeButton>
        <VolumeControlSlider>
          <div
            style={{
              overflowY: 'visible',
              width: '100%',
              lineHeight: '0',
              borderRadius: '5px',
            }}
          >
            <TrackSlider sliderType={SliderType.Volume} />
            <TrackPlayed trackAt={trackAt} sliderType={SliderType.Volume} />
          </div>
        </VolumeControlSlider>
      </VolumeControlContainer>
    </PlayerContainer>
  );
};

export default FooterPlayer;
