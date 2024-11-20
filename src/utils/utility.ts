export interface TrackObject {
  id: number;
  title: string;
  url: string;
  artist: string;
  album: string;
  artwork: string;
}

export const defaultTrack: TrackObject = {
  id: -1,
  title: '',
  url: '',
  artist: '',
  album: '',
  artwork: '',
};
