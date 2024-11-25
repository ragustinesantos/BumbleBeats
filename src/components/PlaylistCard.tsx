import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { TrackObject } from '../utils/utility';

type PlaylistCardParams = {
  playlistName: string,
  numOfSongs: number,
  artwork: string,
  onPress: () => void,
};

export default function PlaylistCard(params: PlaylistCardParams): React.JSX.Element {
  const playlistName = params.playlistName;
  const numOfSongs = params.numOfSongs;
  const artwork = params.artwork;
  const onPress = params.onPress;
  
  return (
    <TouchableOpacity style={style.cardContainer} onPress={onPress}>
      <Image
        style={style.image}
        source={{uri: artwork}}
      />
      <View style={style.txtContainer}>
        <Text style={style.playlistName}>{playlistName}</Text>
        <Text style={style.numOfSongs}>{numOfSongs} Songs</Text>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    margin: 10,
    width: 200,
  },

  image: {
    width: '100%',
    height: 150,
  },

  txtContainer: {
    padding: 10,
    backgroundColor: 'white',
  },

  playlistName: {
    fontSize: 16,
    fontWeight: '600'
  },

  numOfSongs: {
    fontSize: 14
  }
}); 