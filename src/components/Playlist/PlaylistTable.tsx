import { useState } from 'react';
import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';
import { TypeOfPlaylist } from 'src/interfaces/TypeOfPlaylist';
import { PlaylistType } from 'src/pages/app/[playlistType]/[playlist]';
import Track from './Track';

interface Props {
  playlist: PlaylistType;
  type: TypeOfPlaylist;
}

const Table = styled.div`
  margin: 35px;
  padding-bottom: ${({ theme }: ThemeProp) => theme.shape.ui.footer.height};
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 20px 4fr 3fr 30px;
  grid-gap: 20px;
  height: 35px;
  margin: 15px 0;
  width: 100%;
  border-bottom: 1px solid rgba(100, 100, 100, 0.4);
  align-items: center;
  position: sticky;
  top: 60px;
  color: ${({ theme }: ThemeProp) => theme.colors.ui.text};
  background-color: #121212;
  padding: 0 15px;
  font-size: 13px;
  z-index: 2;
`;

const PlaylistTable: React.FC<Props> = ({ playlist, type }): JSX.Element => {
  const [trackSelected, setTrackSelected] = useState<number>(-1);
  return (
    <Table>
      <TableHeader>
        <span style={{ textAlign: 'right' }}>#</span>
        <span>TITLE</span>
        {type === 'playlist' && <span>ALBUM</span>}
        <span style={{ textAlign: 'right' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <title>duration</title>
            <path
              d="M7.999 3H6.999V7V8H7.999H9.999V7H7.999V3ZM7.5 0C3.358 0 0 3.358 0 7.5C0 11.642 3.358 15 7.5 15C11.642 15 15 11.642 15 7.5C15 3.358 11.642 0 7.5 0ZM7.5 14C3.916 14 1 11.084 1 7.5C1 3.916 3.916 1 7.5 1C11.084 1 14 3.916 14 7.5C14 11.084 11.084 14 7.5 14Z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
      </TableHeader>
      {playlist.tracks.map((track: any, index: number) => {
        return (
          <Track
            onClick={() =>
              trackSelected !== index + 1
                ? setTrackSelected(index + 1)
                : setTrackSelected(-1)
            }
            type={type}
            track={type === 'playlist' ? track.track : track}
            trackSelected={trackSelected}
            index={index + 1}
            key={type === 'playlist' ? track.track?.id : track.id}
            playlistUri={playlist.uri}
          />
        );
      })}
    </Table>
  );
};

export default PlaylistTable;
