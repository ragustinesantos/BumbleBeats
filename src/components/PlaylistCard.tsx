import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

type PlaylistCardParams = {
  playlistName: string;
  numOfSongs: number;
  artwork: string;
};

export default function PlaylistCard(
  params: PlaylistCardParams,
): React.JSX.Element {
  const playlistName = params.playlistName;
  const numOfSongs = params.numOfSongs;
  const artwork = params.artwork;

  return (
    <View style={style.cardContainer}>
      <Image
        style={style.image}
        source={
          artwork
            ? {uri: artwork}
            : require('../assets/playlist/default-art.png')
        }
      />
      <View style={style.txtContainer}>
        <Text style={style.playlistName}>{playlistName}</Text>
        <Text style={style.numOfSongs}>{numOfSongs} Songs</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    width: 185,
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
    fontWeight: '600',
  },

  numOfSongs: {
    fontSize: 14,
  },
});
