import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TrackObject} from '../utils/utility';

export default function SongCard({
  track,
}: {
  track: TrackObject;
}): React.JSX.Element {
  return (
    <View style={styles.cardContainer}>
      <View>
        <Image
          style={styles.img}
          source={{uri: track.artwork}}
          alt="No Image"
        />
      </View>
      <Text style={[styles.title, styles.label]} numberOfLines={1}>
        {track.title}
      </Text>
      <Text style={[styles.artist, styles.label]} numberOfLines={1}>
        {track.artist}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 160,
    width: 160,
    marginRight: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowColor: '#000',
    shadowRadius: 10,
    elevation: 5,
  },

  img: {
    height: 110,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  title: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: '500',
    overflow: 'hidden',
  },

  artist: {
    flexShrink: 1,
    fontSize: 12,
    overflow: 'hidden',
  },

  label: {
    marginTop: 1,
    marginLeft: 8,
    color: '#000000',
  },
});
