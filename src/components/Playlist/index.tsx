import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';
import Header from './Header';
import PlaylistTable from './PlaylistTable';
import Layout from 'src/components/Layout';
import { PlaylistType } from 'src/pages/app/[playlistType]/[playlist]';
import { useSelector, useDispatch } from 'react-redux';
import { Options } from 'src/axiosInstance';
import { GlobalState } from 'src/store';
import { PlayingNowState } from 'src/store/PlayingNow/types';
import { UserState } from 'src/store/User/types';
import usePlayer from 'src/hooks/usePlayer';
import { updatePlaylists } from 'src/store/User/actions';
import { UserPlaylist } from 'src/pages/_app';

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

const FollowButton = styled.span`
  &:hover > svg > path:last-child {
    fill: white;
  }
`;
const UnfollowButton = styled.span`
  & > svg > path:last-child {
    fill: ${({ theme }: ThemeProp) => theme.colors.primary.main};
  }
`;

const Playlist: React.FC<Props> = ({ playlist }): JSX.Element => {
  const playingNow = useSelector<GlobalState, PlayingNowState>(
    (state: GlobalState) => state.playingNow
  );
  const followedPlaylists = useSelector<GlobalState, UserState['playlists']>(
    (state: GlobalState) => state.user.playlists
  );

  const player = usePlayer();
  const dispatch = useDispatch();

  const USER_FOLLOWS_PLAYLIST = followedPlaylists.some(
    (i: UserPlaylist) => i.id === playlist.id
  );

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
  const UPDATE_PLAYLIST: Options = {
    url: `/playlists/${playlist.id}/followers`,
    method: USER_FOLLOWS_PLAYLIST ? 'delete' : 'put',
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
        {playlist.type === 'playlist' && (
          <span
            onClick={() => {
              const { url, method } = UPDATE_PLAYLIST;
              player({ url, method });
              dispatch(
                updatePlaylists({ id: playlist.id, name: playlist.name })
              );
            }}
          >
            {USER_FOLLOWS_PLAYLIST ? (
              <UnfollowButton>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="34"
                  viewBox="0 0 24 24"
                  width="34"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </UnfollowButton>
            ) : (
              <FollowButton>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="34"
                  viewBox="0 0 24 24"
                  width="34"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    fill="#999"
                    d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
                  />
                </svg>
              </FollowButton>
            )}
          </span>
        )}
        <PlaylistTable playlist={playlist} type={playlist.type} />
      </Layout>
    </>
  );
};

export default Playlist;
