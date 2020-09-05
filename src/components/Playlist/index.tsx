import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';
import Header from './Header';
import PlaylistTable from './PlaylistTable';
import Layout from 'src/components/Layout';
import { PlaylistType } from 'src/pages/app/[playlistType]/[playlist]';
import { useSelector } from 'react-redux';
import { Options } from 'src/axiosInstance';
import { GlobalState } from 'src/store';
import { PlayingNowState } from 'src/store/PlayingNow/types';
import usePlayer from 'src/hooks/usePlayer';

export interface Props {
  playlist: PlaylistType;
  userFollowsPlaylist: boolean;
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

const Playlist: React.FC<Props> = ({
  playlist,
  userFollowsPlaylist,
}): JSX.Element => {
  const playingNow = useSelector<GlobalState, PlayingNowState>(
    (state: GlobalState) => state.playingNow
  );

  const player = usePlayer();

  const PAUSE_PLAYING: Options = {
    url: '/me/player/pause',
    method: 'put',
  };
  const START_PLAYLIST: Options = {
    url: '/me/player/play',
    method: 'put',
    context_uri: playlist.uri,
  };
  const CONTINUE_PLAYING: Options = {
    url: '/me/player/play',
    method: 'put',
    position_ms: playingNow.position,
  };

  return (
    <>
      <Layout>
        <Header playlist={playlist} />
        <PlayButton
          onClick={() => {
            if (
              !playingNow.paused &&
              playingNow.context.contextUri === playlist.uri
            ) {
              const { url, method } = PAUSE_PLAYING;
              player({ url, method });
            } else if (playingNow.context.contextUri !== playlist.uri) {
              const { url, method, context_uri } = START_PLAYLIST;
              player({ url, method, data: { context_uri } });
            } else {
              const { url, method, position_ms } = CONTINUE_PLAYING;
              player({ url, method, data: { position_ms } });
            }
          }}
        >
          {!playingNow.paused &&
          playingNow.context.contextUri === playlist.uri ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="38"
              viewBox="0 0 24 24"
              width="38"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="white" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="38"
              viewBox="0 0 24 24"
              width="38"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M8 5v14l11-7z" fill="white" />
            </svg>
          )}
        </PlayButton>
        <PlaylistTable playlist={playlist} type={playlist.type} />
      </Layout>
    </>
  );
};

export default Playlist;
