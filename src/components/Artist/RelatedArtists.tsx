import Card from '../HomepageBrowse/Card';
import styled from 'styled-components';

interface Props {
  artists: any[];
}

const ArtistContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(164px, 1fr));
  grid-gap: 16px;
  margin: 35px;
`;

const RelatedArtists: React.FC<Props> = ({ artists }): JSX.Element => {
  return (
    <ArtistContainer>
      {artists.map((artist: any) => {
        return (
          <Card
            data={{
              id: artist.id,
              uri: artist.uri,
              imageUrl: artist.images[0].url,
              name: artist.name,
              description: artist.type,
              type: artist.type,
            }}
            key={artist.id}
          />
        );
      })}
    </ArtistContainer>
  );
};

export default RelatedArtists;
