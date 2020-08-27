import Header from './Header';
import { PlaylistType } from 'src/pages/app/[playlistType]/[playlist]';

export interface Props {
  playlist: PlaylistType;
}

const Playlist: React.FC<Props> = ({ playlist }): JSX.Element => {
  return <Header playlist={playlist} />;
};

export default Playlist;
