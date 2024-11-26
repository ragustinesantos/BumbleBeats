export interface TrackObject {
  id: number;
  title: string;
  url: string;
  artist: string;
  album: string;
  artwork: string;
}

export interface PlaylistObject {
  playlistName: string;
  numOfSongs: number;
  tracks: TrackObject[];
}

export const defaultPlaylist: PlaylistObject = {
  playlistName: 'Bees',
  numOfSongs: 1,
  tracks: [
    {
      id: 1,
      title: 'Song 1',
      url: 'https://example.com/song1.mp3',
      artist: 'Artist',
      album: 'Album',
      artwork: 'https://via.placeholder.com/150',
    },
  ],
};

export const defaultTrack: TrackObject = {
  id: -1,
  title: '',
  url: '',
  artist: '',
  album: '',
  artwork: '',
};

export interface PlayingObject {
  title: string | undefined;
  artist: string | undefined;
  artwork: string | undefined;
}

export const defaultPlayingObject = {
  title: '',
  artist: '',
  artwork: '',
};
