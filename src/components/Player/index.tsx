import { useState, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useCookies } from 'react-cookie';
import axios, { Options } from 'src/axiosInstance';
import usePlayer from 'src/hooks/usePlayer';
import useAuth from 'src/hooks/useAuth';
import { GlobalState } from 'src/store';
import { PlayingNowState } from 'src/store/PlayingNow/types';
import { DeviceState } from 'src/store/Device/types';

interface StyleProps {
  $min?: number;
  $max?: number;
  $sliderType?: SliderType;
  $width?: number;
  disabled?: boolean;
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

const PlayerSmallText = styled.small<ThemeProp>`
  color: ${({ theme }) => theme.colors.ui.text};
  font-size: 11px;
  min-width: 40px;
  text-align: center;
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
  cursor: ${({ disabled }: StyleProps) => (disabled ? 'initial' : 'pointer')};
  &:hover {
    > svg > path:last-child {
      fill: white;
    }
  }
  > svg > path:last-child {
    fill: ${({ disabled }: StyleProps) => disabled && '#666 !important'};
  }
`;

const VolumeButton = styled.button`
  display: flex;
  align-items: center;
  padding: 4px;
  background-color: transparent;
  border-radius: 50%;
  margin: 0 8px;
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
    ${({ $sliderType }: StyleProps) =>
      $sliderType === SliderType.Track
        ? css`
            ${TrackSliderContainer}:hover & {
              display: block;
            }
          `
        : $sliderType === SliderType.Volume &&
          css`
            ${VolumeControlSlider}:hover & {
              display: block;
            }
          `};
  }
`;

const TrackPlayed = styled.div.attrs(({ $min, $max }: StyleProps) => ({
  style: {
    // @ts-expect-error
    marginLeft: `calc(-100% + ${($min / $max) * 100}%)`,
  },
}))`
  height: 5px;
  position: absolute;
  background-color: gray;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  pointer-events: none;
  ${({ $sliderType }: StyleProps) =>
    $sliderType === SliderType.Track
      ? css`
          ${TrackSliderContainer}:hover & {
            background-color: ${({ theme }: ThemeProp) =>
              theme.colors.primary.main};
          }
        `
      : $sliderType === SliderType.Volume &&
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

const TextSkeleton = styled.div`
  background-color: rgba(50, 50, 50, 0.8);
  width: ${({ $width }: StyleProps) => `${$width}px`};
  height: 10px;
  margin: 5px 0;
`;

const FooterPlayer: React.FC = (): JSX.Element => {
  const playingNow = useSelector<GlobalState, PlayingNowState>(
    (state: GlobalState) => state.playingNow
  );
  const deviceId = useSelector<GlobalState, DeviceState['deviceId']>(
    (state: GlobalState) => state.device.deviceId
  );

  const [trackPosition, setTrackPosition] = useState<number>(
    playingNow.position
  );
  const [volume, setVolume] = useState<number>(playingNow.volume || 75);
  const [previousVolume, setPreviousVolume] = useState<number>(volume);
  const [dragging, setDragging] = useState<boolean>(false);
  const [cookie] = useCookies(['access']);
  const [error, setError] = useState<number>(-1);

  const player = usePlayer();
  useAuth(error);

  const PAUSE_PLAYING: Options = {
    url: '/me/player/pause',
    method: 'put',
  };
  const CONTINUE_PLAYING: Options = {
    url: '/me/player/play',
    method: 'put',
    position_ms: playingNow.position,
  };

  const SKIP_NEXT_TRACK: Options = {
    url: '/me/player/next',
    method: 'post',
  };
  const SKIP_PREVIOUS_TRACK: Options = {
    url: '/me/player/previous',
    method: 'post',
  };

  const sliderDrag = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setDragging(true);
      if (e.target.name === 'volume') {
        setVolume(+e.target.value);
      } else {
        setTrackPosition(+e.target.value);
      }
    },
    []
  );

  const seekPosition = useCallback(
    (e: React.MouseEvent<HTMLInputElement>): void => {
      const target = e.target as HTMLInputElement;
      setTrackPosition(+target.value);
      axios(cookie.access.access_token)
        .put(
          `/me/player/seek?device_id=${deviceId}&position_ms=${target.value}`
        )
        .catch((e) => setError(e.response.data.error.status));
      setDragging(false);
    },
    [cookie.access?.access_token, deviceId]
  );

  const changeVolume = useCallback(
    (e: React.MouseEvent<HTMLInputElement>): void => {
      const target = e.target as HTMLInputElement;
      setVolume(+target.value);
      axios(cookie.access.access_token)
        .put(
          `/me/player/volume?device_id=${deviceId}&volume_percent=${target.value}`
        )
        .catch((e) => setError(e.response.data.error.status));
      setDragging(false);
    },
    [cookie.access?.access_token, deviceId]
  );

  const mute = useCallback(() => {
    setVolume((prevState: number): number => {
      if (prevState > 0) {
        setPreviousVolume(prevState);
        return 0;
      }
      return previousVolume;
    });
    const newVolume: number = volume > 0 ? 0 : previousVolume;
    axios(cookie.access.access_token)
      .put(
        `/me/player/volume?device_id=${deviceId}&volume_percent=${newVolume}`
      )
      .catch((e) => setError(e.response.data.error.status));
  }, [deviceId, volume, cookie.access?.access_token]);

  useEffect((): void => {
    if (!dragging) setTrackPosition(playingNow.position);
  }, [playingNow.position, dragging]);

  return (
    <PlayerContainer>
      <TrackInfoContainer>
        <ImageContainer>
          {playingNow.imageUrl !== '' ? (
            <Image src={playingNow.imageUrl} alt="" />
          ) : (
            <ImageSkeleton />
          )}
        </ImageContainer>
        <div>
          {playingNow.name !== '' ? (
            <TrackTitle>{playingNow.name}</TrackTitle>
          ) : (
            <TextSkeleton $width={150} />
          )}
          {playingNow.artists.length > 0 ? (
            <PlayerSmallText>
              {playingNow.artists.map((artist) => artist.name).join(', ')}
            </PlayerSmallText>
          ) : (
            <TextSkeleton $width={60} />
          )}
        </div>
      </TrackInfoContainer>
      <TrackControlsContainer>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SkipButton
            onClick={() => {
              const { url, method } = SKIP_PREVIOUS_TRACK;
              player({ url, method });
            }}
            disabled={
              !!!deviceId || !!!playingNow.id || !playingNow.previousTrack
            }
          >
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
          <PlayButton
            onClick={() => {
              if (playingNow.paused) {
                const { url, method, position_ms } = CONTINUE_PLAYING;
                player({ url, method, data: { position_ms } });
              } else {
                const { url, method } = PAUSE_PLAYING;
                player({ url, method });
              }
            }}
            disabled={!!!deviceId || !!!playingNow.id}
          >
            {playingNow.paused ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="22"
                viewBox="0 0 24 24"
                width="22"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M8 5v14l11-7z" fill="#999" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="22"
                viewBox="0 0 24 24"
                width="22"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="#999" />
              </svg>
            )}
          </PlayButton>
          <SkipButton
            onClick={() => {
              const { url, method } = SKIP_NEXT_TRACK;
              player({ url, method });
            }}
            disabled={!!!deviceId || !!!playingNow.id || !playingNow.nextTrack}
          >
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
        <div
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <PlayerSmallText>
            {moment(playingNow.position).format('m:ss')}
          </PlayerSmallText>
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
                max={playingNow.duration}
                value={trackPosition}
                onMouseUp={seekPosition}
                onChange={sliderDrag}
                $sliderType={SliderType.Track}
                disabled={!!!deviceId || !!!playingNow.id}
              />
              <TrackPlayed
                $min={playingNow.position}
                $max={playingNow.duration}
                $sliderType={SliderType.Track}
              />
            </div>
          </TrackSliderContainer>
          <PlayerSmallText>
            {moment(playingNow.duration).format('m:ss')}
          </PlayerSmallText>
        </div>
      </TrackControlsContainer>
      <VolumeControlContainer>
        <VolumeButton disabled={!!!deviceId} onClick={mute}>
          {volume > 60 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18"
              viewBox="0 0 24 24"
              width="18"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                fill="#999"
                d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
              />
            </svg>
          ) : volume > 0 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18"
              viewBox="0 0 24 24"
              width="18"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                fill="#999"
                d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18"
              viewBox="0 0 24 24"
              width="18"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                fill="#999"
                d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
              />
            </svg>
          )}
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
            <TrackSlider
              min={0}
              max={100}
              value={volume}
              name="volume"
              $sliderType={SliderType.Volume}
              onChange={sliderDrag}
              onMouseUp={changeVolume}
              disabled={!!!deviceId}
            />
            <TrackPlayed
              $min={volume}
              $max={100}
              $sliderType={SliderType.Volume}
            />
          </div>
        </VolumeControlSlider>
      </VolumeControlContainer>
    </PlayerContainer>
  );
};

export default FooterPlayer;
