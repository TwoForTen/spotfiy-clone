import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';
import { useCookies } from 'react-cookie';
import axios from 'src/axiosInstance';
import { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { storeSearch } from 'src/store/Search/actions';
import { useDispatch } from 'react-redux';

const SearchContainer = styled.div`
  width: 365px;
  height: 40px;
  background-color: ${({ theme }: ThemeProp) => theme.colors.common.white};
  border-radius: 50px;
  margin: 0 15px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  z-index: 5000;
  position: relative;
`;

const SearchIcon = styled.span`
  margin: 0 12px;
`;

const Searchbar = styled.input.attrs(() => ({
  type: 'text',
  placeholder: 'Search for Playlists, Artists or Songs',
}))`
  height: 100%;
  border: none;
  outline: none;
  font-size: 90%;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
`;

const ClearIcon = styled.span`
  margin: 0 12px;
`;

const THROTTLE_TIME = 600;

const Search: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const [cookie] = useCookies(['access']);
  const [query, setQuery] = useState<string>('');

  const handleChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      if (!!e.target.value) {
        axios(cookie.access.access_token)
          .get(
            `/search?q=${e.target.value}&type=playlist,album,track,artist&limit=9`
          )
          .then((res) => {
            const {
              data: { albums, artists, playlists, tracks },
            } = res;
            dispatch(
              storeSearch({
                albums: albums.items,
                artists: artists.items,
                playlists: playlists.items,
                tracks: tracks.items,
              })
            );
          })
          .catch(() => {});
      } else {
        dispatch(
          storeSearch({ albums: [], artists: [], playlists: [], tracks: [] })
        );
      }
    }, THROTTLE_TIME),
    []
  );

  return (
    <>
      <SearchContainer>
        <SearchIcon>
          <svg
            viewBox="0 0 512 512"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z"
              fill="#222"
              fillRule="evenodd"
            ></path>
          </svg>
        </SearchIcon>
        <Searchbar
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.persist();
            setQuery(e.target.value);
            handleChange(e);
          }}
        />
        {!!query && (
          <ClearIcon
            onClick={() => {
              setQuery('');
              dispatch(
                storeSearch({
                  albums: [],
                  artists: [],
                  playlists: [],
                  tracks: [],
                })
              );
            }}
          >
            <svg height="24" role="img" width="24" viewBox="0 0 24 24">
              <path
                d="M4.93,4.93,19.07,19.07m-14.14,0L19.07,4.93"
                fill="none"
                stroke="#222"
                strokeMiterlimit="10"
              ></path>
            </svg>
          </ClearIcon>
        )}
      </SearchContainer>
    </>
  );
};

export default Search;
