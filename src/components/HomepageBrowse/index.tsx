import Title from './Title';
import Card from './Card';
import styled from 'styled-components';

import { BrowsePlaylist } from 'src/pages/app';

interface Props {
  playlist: BrowsePlaylist;
}
const Container = styled.div`
  margin: 35px;
`;

const PlaylistContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(164px, 1fr));
  grid-gap: 16px;
  overflow-y: hidden;
`;

const HomepageBrowse: React.FC<Props> = ({ playlist }): JSX.Element => {
  return (
    <Container>
      <Title description={playlist.description} />
      <PlaylistContainer>
        {playlist.items.map((data: any) => {
          return <Card data={data} key={data.id} />;
        })}
      </PlaylistContainer>
    </Container>
  );
};

export default HomepageBrowse;
