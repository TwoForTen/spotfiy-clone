import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';
import Track from './Track';

interface Props {
  tracks: [];
}

const Table = styled.div`
  margin: 35px;
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

const PlaylistTable: React.FC<Props> = ({ tracks }): JSX.Element => {
  return (
    <Table>
      <TableHeader>
        <span style={{ textAlign: 'right' }}>#</span>
        <span>TITLE</span>
        <span>ALBUM</span>
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
      {tracks.map((track: any, index: number) => {
        return (
          <Track track={track.track} index={index + 1} key={track.track.id} />
        );
      })}
    </Table>
  );
};

export default PlaylistTable;
