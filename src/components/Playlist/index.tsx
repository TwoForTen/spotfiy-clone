import { useCallback } from 'react';
import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';
import Header from './Header';
import PlaylistTable from './PlaylistTable';
import Layout from 'src/components/Layout';
import { PlaylistType } from 'src/pages/app/[playlistType]/[playlist]';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import axios from 'src/axiosInstance';

import { GlobalState } from 'src/store';
import { PlayingNowState } from 'src/store/PlayingNow/types';
import { DeviceState } from 'src/store/Device/types';

export interface Props {
  playlist: PlaylistType;
}

const PlayButton = styled.button`
  border-radius: 50%;
  background-color: ${({ theme }: ThemeProp) => theme.colors.primary.main};
  margin: 10px 35px;
  width: 55px;
  height: 55px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.4);
  &:hover {
    background-color: ${({ theme }: ThemeProp) => theme.colors.primary.lighten};
    transform: scale(1.07);
  }
`;

const Playlist: React.FC<Props> = ({ playlist }): JSX.Element => {
  const deviceId = useSelector<GlobalState, DeviceState['deviceId']>(
    (state: GlobalState) => state.device.deviceId
  );
  const playingNow = useSelector<GlobalState, PlayingNowState>(
    (state: GlobalState) => state.playingNow
  );

  const [cookie] = useCookies(['access']);

  const pausePlaying = useCallback((): void => {
    axios(cookie.access.access_token)
      .put(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`)
      .catch(() => {});
  }, [cookie.access?.access_token, deviceId]);

  const continuePlaying = useCallback((): void => {
    axios(cookie.access.access_token)
      .put(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        position_ms: playingNow.position,
      })
      .catch(() => {});
  }, [cookie.access?.access_token, deviceId]);

  // console.log(playlist);

  return (
    <>
      <Layout>
        <Header playlist={playlist} />
        <PlayButton
          onClick={playingNow.paused ? continuePlaying : pausePlaying}
        >
          {playingNow.paused ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="38"
              viewBox="0 0 24 24"
              width="38"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M8 5v14l11-7z" fill="white" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="38"
              viewBox="0 0 24 24"
              width="38"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="white" />
            </svg>
          )}
        </PlayButton>
        <PlaylistTable playlist={playlist} type={playlist.type} />
      </Layout>
    </>
  );
};

export default Playlist;
