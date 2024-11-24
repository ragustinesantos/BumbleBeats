import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import RecentlyPlayedCard from '../components/RecentlyPlayedCard';
import SongCard from '../components/SongCard';

export default function Home(): React.JSX.Element {


  return (
    <View style={styles.pageContainer}>
      <Text style={styles.sectionLabel}>
        RECENTLY PLAYED
      </Text>
      <View style={styles.recentlyPlayed}>
        <RecentlyPlayedCard title='Bee Movie' />
        <RecentlyPlayedCard title='Bee Movie' />
      </View>
      <View style={styles.recentlyPlayed}>
        <RecentlyPlayedCard title='Bee Movie' />
        <RecentlyPlayedCard title='Bee Movie' />
      </View>
      <View style={styles.recentlyPlayed}>
        <RecentlyPlayedCard title='Bee Movie' />
        <RecentlyPlayedCard title='Bee Movie' />
      </View>

      <Text style={styles.sectionLabel}>
        NEW RELEASES
      </Text>
      <ScrollView
        horizontal={true}
      >
        <SongCard artist='The Name' title='The Title' />
        <SongCard artist='The Name' title='The Title' />
        <SongCard artist='The Name' title='The Title' />
        <SongCard artist='The Name' title='The Title' />
        <SongCard artist='The Name' title='The Title' />
      </ScrollView>

      <Text style={styles.sectionLabel}>
        SUGGESTIONS FOR YOU
      </Text>
      <ScrollView
        horizontal={true}
      >
        <SongCard artist='The Name' title='The Title' />
        <SongCard artist='The Name' title='The Title' />
        <SongCard artist='The Name' title='The Title' />
        <SongCard artist='The Name' title='The Title' />
        <SongCard artist='The Name' title='The Title' />
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    marginHorizontal: 20,
  },

  sectionLabel: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 15,
  },

  recentlyPlayed: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

});
