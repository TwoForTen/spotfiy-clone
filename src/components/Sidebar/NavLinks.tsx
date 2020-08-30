import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';

import { BrowsePlaylist } from 'src/pages/app';

interface Props {
  playlists: {
    id: string;
    name: string;
  }[];
}

interface StyleProps extends ThemeProp {
  selected?: boolean;
}

type Links = { title: string; to: string; icon: JSX.Element }[];

const Nav = styled.ul`
  margin-top: 20px;
`;

const Padding = styled.div`
  padding: 8px 16px;
`;

const NavLink = styled.div`
  display: grid;
  grid-template-columns: 24px auto;
  grid-gap: 16px;
  align-items: center;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  transition: 300ms;
  ${({ theme, selected }: StyleProps) => css`
    border-radius: ${theme.shape.borderRadius};
    color: ${selected ? theme.colors.common.white : theme.colors.ui.text};
    background-color: ${selected ? '#272727' : 'none'};
    &:hover {
      color: ${theme.colors.common.white};
    }
  `}
`;

const Divider = styled.hr`
  height: 1px;
  margin-bottom: 14px;
  background-color: ${({ theme }: ThemeProp) => theme.colors.common.faded};
  border: none;
`;

const PlaylistsTitle = styled.h6`
  color: ${({ theme }: ThemeProp) => theme.colors.ui.text};
  font-size: 13px;
  margin-bottom: 16px;
`;

const PlaylistsList = styled.li`
  color: ${({ theme }: ThemeProp) => theme.colors.ui.text};
  font-size: 13px;
  padding: 8px 0;
  font-weight: 400;
  &:hover {
    color: ${({ theme }: ThemeProp) => theme.colors.common.white};
  }
`;

const links: Links = [
  {
    title: 'Home',
    to: '/app',
    icon: (
      <svg
        viewBox="0 0 512 512"
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M448 463.746h-149.333v-149.333h-85.334v149.333h-149.333v-315.428l192-111.746 192 110.984v316.19z"
          fill="currentColor"
        ></path>
      </svg>
    ),
  },
  {
    title: 'Search',
    to: '/app/search',
    icon: (
      <svg
        viewBox="0 0 512 512"
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z"
          fill="currentColor"
          fillRule="evenodd"
        ></path>
      </svg>
    ),
  },
  {
    title: 'Your Library',
    to: '/app/user/library',
    icon: (
      <svg
        viewBox="0 0 512 512"
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M291.301 81.778l166.349 373.587-19.301 8.635-166.349-373.587zM64 463.746v-384h21.334v384h-21.334zM192 463.746v-384h21.334v384h-21.334z"
          fill="currentColor"
        ></path>
      </svg>
    ),
  },
];

const NavLinks: React.FC<Props> = ({ playlists }): JSX.Element => {
  const router = useRouter();

  return (
    <>
      <Nav>
        {links.map((link) => {
          const { title, to, icon } = link;
          return (
            <Link key={title} href={to}>
              <a>
                <NavLink selected={router.pathname === to}>
                  {icon} <span>{title}</span>
                </NavLink>
              </a>
            </Link>
          );
        })}
      </Nav>
      <Padding>
        <Divider />
        <PlaylistsTitle>PLAYLISTS</PlaylistsTitle>
        <ul>
          {playlists.map((playlist: any) => {
            return (
              <Link
                key={playlist.id}
                href={'/app/[playlistType]/[playlist]'}
                as={`/app/playlist/${playlist.id}`}
              >
                <a>
                  <PlaylistsList>{playlist.name}</PlaylistsList>
                </a>
              </Link>
            );
          })}
        </ul>
      </Padding>
    </>
  );
};

export default NavLinks;
