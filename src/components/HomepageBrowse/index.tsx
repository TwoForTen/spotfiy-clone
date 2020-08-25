import Title from './Title';
import Card from './Card';
import styled from 'styled-components';

import { BrowsePlaylist } from 'src/pages/app';

interface Props {
  playlist: BrowsePlaylist;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(164px, 1fr));
  grid-gap: 16px;
  overflow-y: hidden;
`;

const HomepageBrowse: React.FC<Props> = ({ playlist }): JSX.Element => {
  return (
    <>
      <Title description={playlist.description} />
      <Container>
        {playlist.items.map((data: any) => {
          return <Card data={data} key={data.id} />;
        })}
      </Container>
    </>
  );
};

export default HomepageBrowse;
