/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import ProgressBar from '../components/ProgressBar';
import {defaultPlayingObject, PlayingObject} from '../utils/utility';
import {useFocusEffect} from '@react-navigation/native';
import {useActiveTrackContext} from '../_utils/queue-context';

export default function Playing({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}): React.JSX.Element {
  const {source} = route.params;
  const {
    activeTrack,
    skipToNext,
    skipToPrevious,
    toggleLoop,
    togglePlayPause,
    isLooping,
    playing,
    setPlaying,
  } = useActiveTrackContext() || {};

  const [track, setTrack] = useState<PlayingObject>({...defaultPlayingObject});

  const [likedSongs, setLikedSongs] = useState<PlayingObject[]>([]);

  useEffect(() => {
    if (source === 'Home') {
      navigation.setOptions({
        headerLeft: undefined,
      });
    }
  }, [navigation]);

  // Triggers a re-render when the screen comes into focus or selected
  // Used to update the Playing Screen on TabNav with the information on the Active Track
  useFocusEffect(
    useCallback(() => {
      const fetchTrack = async () => {
        try {
          if (activeTrack) {
            setTrack({
              title: activeTrack?.title,
              artist: activeTrack?.artist,
              artwork: activeTrack?.artwork,
            });
            TrackPlayer.play();
            if (setPlaying) {
              setPlaying(true);
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchTrack();
    }, [activeTrack]),
  );

  const handleLikeSong = () => {
    setLikedSongs(prevLikedSongs => [...prevLikedSongs, track]);
    console.log('Song liked:', track);
  };

  return (
    <View style={style.container}>
      <Image
        source={
          activeTrack?.artwork
            ? {uri: activeTrack?.artwork}
            : {uri: 'https://via.placeholder.com/150'}
        }
        style={style.art}
      />

      <View style={style.trackInfo}>
        <Text style={style.title}>{activeTrack?.title}</Text>
        <Text style={style.artist}>{activeTrack?.artist}</Text>
      </View>

      <ProgressBar />

      <View style={style.controls}>
        <TouchableOpacity onPress={toggleLoop} style={style.controlBtn}>
          <View style={style.loopContainer}>
            <Image
              source={require('../assets/nav-icons/repeat.png')}
              style={style.extraControlIcon}
            />
            <View>{isLooping && <View style={style.loopIndicator} />}</View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={skipToPrevious} style={style.controlBtn}>
          <Image
            source={require('../assets/nav-icons/skip-back.png')}
            style={style.secondaryControlIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlayPause} style={style.controlBtn}>
          <Image
            source={
              playing
                ? require('../assets/nav-icons/pause.png')
                : require('../assets/nav-icons/play.png')
            }
            style={style.primaryControlIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={skipToNext} style={style.controlBtn}>
          <Image
            source={require('../assets/nav-icons/skip-forward.png')}
            style={style.secondaryControlIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLikeSong} style={style.controlBtn}>
          <Image
            source={require('../assets/nav-icons/heart.png')}
            style={style.extraControlIcon}
          />
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
    backgroundColor: 'black',
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
    color: 'black',
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
    marginTop: 20,
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
    height: 30,
  },

  loopContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },

  loopIndicator: {
    width: 3,
    height: 3,
    borderRadius: 4,
    backgroundColor: '#E9A941',
    alignSelf: 'center',
  },
});
