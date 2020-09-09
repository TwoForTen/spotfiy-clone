import Header from './Header';
import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';
import { ArtistInfo } from 'src/pages/app/artist/[artist]';
import usePlayer from 'src/hooks/usePlayer';
import { useSelector } from 'react-redux';
import { Options } from 'src/axiosInstance';
import { GlobalState } from 'src/store';
import { PlayingNowState } from 'src/store/PlayingNow/types';
import Overview from './Overview';

interface Props {
  info: ArtistInfo;
  topTracks: any;
}

interface StyleProps {
  $selected?: boolean;
}

const PlayButton = styled.button`
  border-radius: 50%;
  background-color: ${({ theme }: ThemeProp) => theme.colors.primary.main};
  margin: 0 35px;
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

const ArtistTabs = styled.div`
  display: flex;
  margin: 35px;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: ${({ $selected }: StyleProps) =>
    $selected ? 'rgba(255,255,255,0.15)' : 'transparent'};
  color: ${({ theme }: ThemeProp) => theme.colors.common.white};
  font-size: 15px;
  cursor: pointer;
`;

const ArtistComponent: React.FC<Props> = ({ info, topTracks }): JSX.Element => {
  const player = usePlayer();

  const playingNow = useSelector<GlobalState, PlayingNowState>(
    (state: GlobalState) => state.playingNow
  );

  const PAUSE_PLAYING: Options = {
    url: '/me/player/pause',
    method: 'put',
  };
  const START_PLAYLIST: Options = {
    url: '/me/player/play',
    method: 'put',
    context_uri: info.uri,
  };
  const CONTINUE_PLAYING: Options = {
    url: '/me/player/play',
    method: 'put',
    position_ms: playingNow.position,
  };
  return (
    <>
      <Header info={info} />
      <PlayButton
        onClick={() => {
          if (!playingNow.paused && playingNow.context.uri === info.uri) {
            const { url, method } = PAUSE_PLAYING;
            player({ url, method });
          } else if (playingNow.context.uri !== info.uri) {
            const { url, method, context_uri } = START_PLAYLIST;
            player({ url, method, data: { context_uri } });
          } else {
            const { url, method, position_ms } = CONTINUE_PLAYING;
            player({ url, method, data: { position_ms } });
          }
        }}
      >
        {!playingNow.paused && playingNow.context.uri === info.uri ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36"
            viewBox="0 0 24 24"
            width="36"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="white" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36"
            viewBox="0 0 24 24"
            width="36"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M8 5v14l11-7z" fill="white" />
          </svg>
        )}
      </PlayButton>
      <ArtistTabs>
        <TabButton $selected>Overview</TabButton>
        <TabButton>Related</TabButton>
      </ArtistTabs>
      <Overview
        topTracks={topTracks}
        playlistUri={topTracks.map((track: any) => track.uri)}
      />
    </>
  );
};

export default ArtistComponent;
