const playlistType = {
  Playlist: 'playlist',
  Album: 'album',
  User: 'user',
} as const;

export type TypeOfPlaylist =
  | typeof playlistType[keyof typeof playlistType]
  | undefined;
