import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type recentlyPlayedParams = {
  title: string,
}

export default function RecentlyPlayedCard(params: recentlyPlayedParams): React.JSX.Element {
  return (
    <View style={styles.playedContainer}>
      <View style={styles.image}>
        {/* Place image here */}
      </View>
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
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowColor: '#000',
    shadowRadius: 10,
    elevation: 5,
    marginVertical: 5,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: 180,
  },

  image: {
    borderWidth: 1,
    height: 30,
    width: 30,
    borderRadius: 4,
  },

  title: {
    fontSize: 16,
    marginLeft: 5,
    color: '#000000',
  },

});
