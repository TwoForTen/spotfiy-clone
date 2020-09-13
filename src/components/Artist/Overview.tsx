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

const AlbumsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 35px;
  &:after {
    content: '';
    flex-basis: 620px;
  }
`;

const Overview: React.FC<Props> = ({
  topTracks,
  playlistUri,
  albums,
}): JSX.Element => {
  const [trackSelected, setTrackSelected] = useState<number>(-1);
  return (
    <>
      <div style={{ margin: 35 }}>
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
      </div>
      <AlbumsContainer>
        <Title description={{ title: 'Albums' }} />
        {albums
          .filter((album) => album.albumGroup === 'album')
          .map((album: any) => {
            return <PlaylistCard key={album.id} album={album} />;
          })}
      </AlbumsContainer>
      <AlbumsContainer>
        <Title description={{ title: 'Singles' }} />
        {albums
          .filter((album) => album.albumGroup === 'single')
          .map((album: any) => {
            return <PlaylistCard key={album.id} album={album} />;
          })}
      </AlbumsContainer>
      <AlbumsContainer>
        <Title description={{ title: 'Appears on' }} />
        {albums
          .filter((album) => album.albumGroup === 'appears_on')
          .map((album: any) => {
            return <PlaylistCard key={album.id} album={album} />;
          })}
      </AlbumsContainer>
    </>
  );
};

export default Overview;
