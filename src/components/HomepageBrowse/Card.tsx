import { useRouter } from 'next/router';
import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';
import { useSelector } from 'react-redux';
import { GlobalState } from 'src/store';
import { PlayingNowState } from 'src/store/PlayingNow/types';
import usePlayer from 'src/hooks/usePlayer';
import { Options } from 'src/axiosInstance';

interface Props {
  data: {
    id: string;
    name: string;
    imageUrl: string;
    description?: string;
    type?: string;
    uri: string;
  };
}

interface StyleProps {
  $type?: string;
  $playingNow?: boolean;
}

const CardRoot = styled.figure`
  background-color: ${({ theme }: ThemeProp) => theme.colors.ui.card};
  border-radius: ${({ theme }: ThemeProp) => theme.shape.borderRadius};
  padding: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  cursor: pointer;
  position: relative;
`;

const PlayButton = styled.button`
  border-radius: 50%;
  background-color: ${({ theme }: ThemeProp) => theme.colors.primary.main};
  display: ${({ $playingNow }: StyleProps) =>
    $playingNow ? 'flex !important' : 'none'};
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 15px;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.4);
  &:hover {
    background-color: ${({ theme }: ThemeProp) => theme.colors.primary.lighten};
    transform: scale(1.07);
  }
  ${CardRoot}:hover & {
    display: flex;
  }
`;

const ImageContainer = styled.div`
  border-radius: ${({ $type }: StyleProps) => $type === 'artist' && '50%'};
  width: 100%;
  padding-bottom: 100%;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
  position: relative;
  margin-bottom: 16px;
  overflow: hidden;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const DescriptionContainer = styled.div`
  text-transform: capitalize;
  overflow: hidden;
`;

const Title = styled.h4`
  color: ${({ theme }: ThemeProp) => theme.colors.common.white};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 5px;
  font-size: 15px;
`;

const Description = styled.small`
  color: ${({ theme }: ThemeProp) => theme.colors.ui.text};
  font-size: 10px;
  line-height: 16px;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Card: React.FC<Props> = ({ data }): JSX.Element => {
  const router = useRouter();
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
    context_uri: data.uri,
  };
  const CONTINUE_PLAYING: Options = {
    url: '/me/player/play',
    method: 'put',
    position_ms: playingNow.position,
  };

  return (
    <CardRoot
      onClick={() =>
        data.type === 'artist'
          ? router.push(`/app/artist/[artist]`, `/app/${data.type}/${data.id}`)
          : router.push(
              `/app/[playlistType]/[playlist]`,
              `/app/${data.type}/${data.id}`
            )
      }
    >
      <ImageContainer $type={data.type}>
        <Image src={data.imageUrl} alt="" />
      </ImageContainer>
      <DescriptionContainer>
        <Title>{data.name}</Title>
        <Description>{data.description}</Description>
      </DescriptionContainer>
      <PlayButton
        $playingNow={playingNow.context.uri === data.uri}
        onClick={(e) => {
          e.stopPropagation();
          if (!playingNow.paused && playingNow.context.uri === data.uri) {
            const { url, method } = PAUSE_PLAYING;
            player({ url, method });
          } else if (playingNow.context.uri !== data.uri) {
            const { url, method, context_uri } = START_PLAYLIST;
            player({ url, method, data: { context_uri } });
          } else {
            const { url, method, position_ms } = CONTINUE_PLAYING;
            player({ url, method, data: { position_ms } });
          }
        }}
      >
        {!playingNow.paused && playingNow.context.uri === data.uri ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="white" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M8 5v14l11-7z" fill="white" />
          </svg>
        )}
      </PlayButton>
    </CardRoot>
  );
};

export default Card;
