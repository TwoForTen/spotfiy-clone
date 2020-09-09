import Layout from 'src/components/Layout';
import Track from 'src/components/Playlist/Track';
import Title from 'src/components/HomepageBrowse/Title';
import Browse from 'src/components/HomepageBrowse';
import { useSelector } from 'react-redux';
import { GlobalState } from 'src/store';
import { SearchState } from 'src/store/Search/types';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import useAuth from 'src/hooks/useAuth';
import { useCookies } from 'react-cookie';
import { BrowsePlaylist } from 'src/pages/app';
import { NextPage } from 'next';

const Container = styled.div`
  margin: 35px;
`;

const createPlaylistObj = (obj: any, type: string): BrowsePlaylist => {
  return {
    items: obj.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        imageUrl: item.images[0]?.url || '',
        description: item.type === 'playlist' ? item.description : item.type,
        type: item.type,
        uri: item.uri,
      };
    }),
    description: {
      title: type,
    },
  };
};

const Search: NextPage = (): JSX.Element => {
  const search = useSelector<GlobalState, SearchState>(
    (state: GlobalState) => state.search
  );

  const [trackSelected, setTrackSelected] = useState<number>(-1);
  const [error, setError] = useState<number>(-1);
  const [cookie] = useCookies(['access']);

  useAuth(error);

  useEffect(() => {
    if (!!!cookie.access?.access_token) setError(401);
  }, [cookie]);

  return (
    <Layout>
      <Container>
        {!isEmpty(search.tracks) && (
          <div>
            <Title description={{ title: 'Tracks' }} />
            {search.tracks.map((track: any, index: number) => {
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
                  trackUri={[track.uri]}
                ></Track>
              );
            })}
          </div>
        )}
      </Container>
      {!isEmpty(search.albums) && (
        <Browse playlist={createPlaylistObj(search.albums, 'Albums')} />
      )}
      {!isEmpty(search.playlists) && (
        <Browse playlist={createPlaylistObj(search.playlists, 'Playlists')} />
      )}
      {!isEmpty(search.artists) && (
        <Browse playlist={createPlaylistObj(search.artists, 'Artists')} />
      )}
    </Layout>
  );
};

export default Search;
