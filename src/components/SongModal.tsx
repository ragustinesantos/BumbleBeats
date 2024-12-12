import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {useActiveTrackContext} from '../_utils/queue-context';



export default function SongModal(): React.JSX.Element {
  const {
    activeTrack,
    skipToNext,
    togglePlayPause,
    playing,
  } = useActiveTrackContext() || {};

  return (
    <TouchableOpacity style={style.container}>
      <Image source={{uri: activeTrack?.artwork}} style={style.artwork} />
      <View style={style.infoContainer}>
        <Text style={style.title}>{activeTrack?.title}</Text>
        <Text style={style.artist}>{activeTrack?.artist}</Text>
      </View>
      <TouchableOpacity onPress={togglePlayPause}>
        <Image
          source={
            playing
              ? require('../assets/nav-icons/pause.png')
              : require('../assets/nav-icons/play.png')
          }
          style={style.pausePlay}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={skipToNext}>
        <Image
          source={require('../assets/nav-icons/skip-forward.png')}
          style={style.pausePlay}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 50,
    bottom: 68,
    height: 70,
    width: '100%',
    backgroundColor: '#E9A941',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  artwork: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: 'white',
  },

  infoContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },

  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#002538',
  },

  artist: {
    fontSize: 12,
    color: '#002538',
  },

  pausePlay: {
    width: 20,
    height: 20,
    tintColor: '#002538',
    marginRight: 10,
  },
});
