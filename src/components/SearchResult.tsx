import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {TrackObject} from '../utils/utility';

export default function SearchResult({
  track,
}: {
  track: TrackObject;
}): React.JSX.Element {
  return (
    <View style={styles.searchResult}>
      <Image
        style={styles.searchImg}
        source={
          track.artwork
            ? {uri: track.artwork}
            : {uri: 'https://via.placeholder.com/150'}
        }
        alt="Track Art"
      />
      <View>
        <Text style={styles.searchTitle}>{track.title}</Text>
        <Text style={styles.searchArtist}>{track.artist}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchResult: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 430,
    height: 80,
    padding: 10,
  },

  searchImg: {
    height: 60,
    width: 60,
    borderRadius: 8,
    marginRight: 10,
  },

  searchTitle: {
    fontSize: 16,
    fontWeight: '600',
  },

  searchArtist: {
    fontSize: 14,
  },
});
