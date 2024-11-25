import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type songCardParams = {
  title: string,
  artist: string,
}

export default function SongCard(params: songCardParams): React.JSX.Element {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.img}>

      </View>
      <Text style={[styles.title, styles.label]}>
        {params.title}
      </Text>
      <Text style={[styles.artist, styles.label]}>
        {params.artist}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 160,
    width: 160,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    marginRight: 10,
  },

  img: {
    height: 110,
    width: '100%',
    borderWidth: 0.5, // remove when image is already available
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: '500',
  },

  artist: {
    fontSize: 12,
  },

  label: {
    marginTop: 1,
    marginLeft: 8,
    color: '#000000',
  }

});
