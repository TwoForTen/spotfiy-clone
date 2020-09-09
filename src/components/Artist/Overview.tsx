import Track from 'src/components/Playlist/Track';
import Title from 'src/components/HomepageBrowse/Title';
import { useState } from 'react';
import { isEmpty } from 'lodash';

interface Props {
  topTracks: any[];
  playlistUri: string[];
}

const Overview: React.FC<Props> = ({ topTracks, playlistUri }): JSX.Element => {
  const [trackSelected, setTrackSelected] = useState<number>(-1);
  return (
    <div style={{ margin: 35 }}>
      {!isEmpty(topTracks) && (
        <div>
          <Title description={{ title: 'Popular' }} seeAll={false} />
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
  );
};

export default Overview;
