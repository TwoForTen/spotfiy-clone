import Track from 'src/components/Playlist/Track';
import Title from 'src/components/HomepageBrowse/Title';
import { useState } from 'react';
import { isEmpty } from 'lodash';
import { ArtistAlbum } from 'src/pages/app/artist/[artist]';
import styled from 'styled-components';
import PlaylistCard from './PlaylistCard';

interface Props {
  topTracks: any[];
  playlistUri: string[];
  albums: ArtistAlbum[];
}

const Container = styled.div`
  margin: 35px;
`;
const AlbumsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 10px;
  margin: 30px 0;
`;

const Overview: React.FC<Props> = ({
  topTracks,
  playlistUri,
  albums,
}): JSX.Element => {
  const [trackSelected, setTrackSelected] = useState<number>(-1);
  return (
    <>
      <Container>
        {!isEmpty(topTracks) && (
          <div>
            <Title description={{ title: 'Popular' }} />
            {topTracks.map((track: any, index: number) => {
              return (
                <Track
                  key={track.id}
                  onClick={() =>
                    trackSelected !== index + 1
                      ? setTrackSelected(index + 1)
                      : setTrackSelected(-1)
                  }
                  track={track}
                  trackSelected={trackSelected}
                  index={index + 1}
                  type={'track'}
                  trackUri={[...playlistUri]}
                ></Track>
              );
            })}
          </div>
        )}
        <div style={{ margin: '25px 0' }}>
          <Title description={{ title: 'Albums' }} />
          <AlbumsContainer>
            {albums
              .filter((album) => album.albumGroup === 'album')
              .map((album: any) => {
                return <PlaylistCard key={album.id} album={album} />;
              })}
          </AlbumsContainer>
          <Title description={{ title: 'Singles' }} />
          <AlbumsContainer>
            {albums
              .filter((album) => album.albumGroup === 'single')
              .map((album: any) => {
                return <PlaylistCard key={album.id} album={album} />;
              })}
          </AlbumsContainer>
          <Title description={{ title: 'Appears on' }} />
          <AlbumsContainer>
            {albums
              .filter((album) => album.albumGroup === 'appears_on')
              .map((album: any) => {
                return <PlaylistCard key={album.id} album={album} />;
              })}
          </AlbumsContainer>
        </div>
      </Container>
    </>
  );
};

export default Overview;
