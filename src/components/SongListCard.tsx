import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

type SongListCardParams = {
  artwork: string;
  title: string;
  artist: string;
};

export default function SongListCard(
  params: SongListCardParams,
): React.JSX.Element {
  const artwork = params.artwork;
  const title = params.title;
  const artist = params.artist;

  return (
    <View style={styles.container}>
      <Image source={{uri: artwork}} style={styles.songArtwork} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{title}</Text>
        <Text style={styles.songArtist}>{artist}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  songArtwork: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },

  songInfo: {
    flex: 1,
  },

  songTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },

  songArtist: {
    fontSize: 12,
    color: 'black',
  },
});