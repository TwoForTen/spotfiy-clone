const playlistType = {
  Playlist: 'playlist',
  Album: 'album',
  User: 'user',
  Track: 'track',
} as const;

export type TypeOfPlaylist =
  | typeof playlistType[keyof typeof playlistType]
  | undefined;
