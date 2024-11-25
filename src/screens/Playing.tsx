import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import TrackPlayer, { useProgress, RepeatMode } from 'react-native-track-player';
import ProgressBar from '../components/ProgressBar';

export default function Playing(): React.JSX.Element {
  const [track, setTrack] = useState({
    title: 'Song Title',
    artist: 'Artist Name',
    artwork: '',
  });
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const fetchTrackData = async () => {
      const trackId = await TrackPlayer.getCurrentTrack();
      
      if (trackId !== null) {
        const trackData = await TrackPlayer.getTrack(trackId);
        if (trackData) {
          setTrack({
            title: trackData.title || '',
            artist: trackData.artist || '',
            artwork: trackData.artwork || '',
          });
        }
      } else {
        console.log("Nothing playing");
      }
    };
  
    fetchTrackData();
  }, []);

  // Pausing/playing
  const togglePlayPause = async () => {
    if (playing) {
      await TrackPlayer.pause();
    } 
    else {
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

  // Need to add liking and looping functionality

  return (
    <View style={style.container}>

      <Image source={{uri: track.artwork}} style={style.art} />

      <View style={style.trackInfo}>
        <Text style={style.title}>{track.title}</Text>
        <Text style={style.artist}>{track.artist}</Text>
      </View>

      <ProgressBar />

      <View style={style.controls}>

        <TouchableOpacity onPress={()=> console.log('Looped')} style={style.controlBtn}>
          <Image source={require('../assets/nav-icons/shuffle-angular.png')} style={style.extraControlIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={skipToPrevious} style={style.controlBtn}>
          <Image source={require('../assets/nav-icons/skip-back.png')} style={style.secondaryControlIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlayPause} style={style.controlBtn}>
          <Image
            source={playing ? require('../assets/nav-icons/pause.png') : require('../assets/nav-icons/play.png')}
            style={style.primaryControlIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={skipToNext} style={style.controlBtn}>
          <Image source={require('../assets/nav-icons/skip-forward.png')} style={style.secondaryControlIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> console.log('Loved')} style={style.controlBtn}>
          <Image source={require('../assets/nav-icons/heart.png')} style={style.extraControlIcon} />
        </TouchableOpacity>

      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  art: {
    width: 350,
    height: 350,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 30,
    backgroundColor: 'black'
  },

  trackInfo: {
    alignItems: 'flex-start',
    width: '88%',
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 5,
    color: 'black'
  },

  artist: {
    fontSize: 16,
    color: 'gray',
  },

  progressBar: {
    width: '80%',
    marginBottom: 30,
  },

  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },

  controlBtn: {
    marginHorizontal: 20,
  },

  primaryControlIcon: {
    width: 45,
    height: 45,
  },

  secondaryControlIcon: {
    width: 30,
    height: 35,
  },

  extraControlIcon: {
    width: 30,
    height: 30
  }

});
