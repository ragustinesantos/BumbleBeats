import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type recentlyPlayedParams = {
  title: string,
  artwork: string,
}

export default function RecentlyPlayedCard(params: recentlyPlayedParams): React.JSX.Element {
  return (
    <View style={styles.playedContainer}>
      <Image
        style={styles.image}
        source={{ uri: params.artwork }}
        alt='song image'
      />
      <Text style={styles.title}>
        {params.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  playedContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowColor: '#000',
    shadowRadius: 10,
    elevation: 5,
    marginVertical: 5,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    width: 180,
    overflow: 'hidden'
  },

  image: {
    borderWidth: 1,
    height: 30,
    width: 30,
    borderRadius: 4,
  },

  title: {
    fontSize: 15,
    marginLeft: 5,
    color: '#000000',
  },

});
