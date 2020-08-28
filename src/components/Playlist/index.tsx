import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';
import Header from './Header';
import Layout from 'src/components/Layout';
import { PlaylistType } from 'src/pages/app/[playlistType]/[playlist]';

export interface Props {
  playlist: PlaylistType;
}

const PlayButton = styled.button`
  border-radius: 50%;
  background-color: ${({ theme }: ThemeProp) => theme.colors.primary.main};
  margin: 0px 35px;
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.4);
  &:hover {
    background-color: ${({ theme }: ThemeProp) => theme.colors.primary.lighten};
    transform: scale(1.07);
  }
`;

const Playlist: React.FC<Props> = ({ playlist }): JSX.Element => {
  return (
    <>
      <Layout>
        <Header playlist={playlist} />
        <PlayButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40"
            viewBox="0 0 24 24"
            width="40"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M8 5v14l11-7z" fill="white" />
          </svg>
        </PlayButton>
      </Layout>
    </>
  );
};

export default Playlist;
