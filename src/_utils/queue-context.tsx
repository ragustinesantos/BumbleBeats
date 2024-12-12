import React, {createContext, useContext, useEffect, useState} from 'react';
import TrackPlayer, {Event, RepeatMode} from 'react-native-track-player';

interface ActiveTrack {
  id: string;
  artwork: string;
  title: string;
  artist: string;
}

interface ActiveTrackContextType {
  activeTrack: ActiveTrack | null;
  playing: boolean;
  isLooping: boolean;
  togglePlayPause: () => void;
  skipToNext: () => void;
  skipToPrevious: () => void;
  toggleLoop: () => void;
  setPlaying: (state: boolean) => void;
}

const ActiveTrackContext = createContext<ActiveTrackContextType | null>(null);

export const ActiveTrackProvider = ({children}: {children: any}) => {
  const [activeTrack, setActiveTrack] = useState<ActiveTrack | null>(null);
  const [playing, setPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  const checkTrack = async () => {
    const getTrack = await TrackPlayer.getActiveTrack();
    const formatTrack: ActiveTrack = {
      id: getTrack?.id || '',
      artwork: getTrack?.artwork || '',
      title: getTrack?.title || '',
      artist: getTrack?.artist || '',
    };
    setActiveTrack(formatTrack);
  };

  // Pausing/playing
  const togglePlayPause = async () => {
    if (playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setPlaying(!playing);
  };

  // Skipping next
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  // Skipping prev
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  // Looping songs using RepeatMode
  const toggleLoop = async () => {
    const currentRepeatMode = await TrackPlayer.getRepeatMode();
    if (currentRepeatMode === RepeatMode.Track) {
      await TrackPlayer.setRepeatMode(RepeatMode.Off);
      setIsLooping(false);
    } else {
      await TrackPlayer.setRepeatMode(RepeatMode.Track);
      setIsLooping(true);
    }
  };

  useEffect(() => {
    const trackChangeTrigger = TrackPlayer.addEventListener(
      Event.PlaybackActiveTrackChanged,
      checkTrack,
    );

    return () => trackChangeTrigger.remove();
  }, []);

  return (
    <ActiveTrackContext.Provider
      value={{
        activeTrack,
        playing,
        isLooping,
        togglePlayPause,
        skipToNext,
        skipToPrevious,
        toggleLoop,
        setPlaying,
      }}>
      {children}
    </ActiveTrackContext.Provider>
  );
};

export const useActiveTrackContext = () => {
  return useContext(ActiveTrackContext);
};
