import Title from './Title';
import Card from './Card';
import styled from 'styled-components';

import { BrowsePlaylists } from 'src/pages/app';

interface Props {
  topArtists: BrowsePlaylists;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(164px, 1fr));
  /* grid-template-rows: 1fr repeat(10, 0px); */
  grid-gap: 16px;
  overflow-y: hidden;
`;

const TracksContainer: React.FC<Props> = ({ topArtists }): JSX.Element => {
  return (
    <>
      <Title description={topArtists.description} />
      <Container>
        {topArtists.items.map((data: any) => {
          return <Card data={data} key={data.id} />;
        })}
      </Container>
    </>
  );
};

export default TracksContainer;
