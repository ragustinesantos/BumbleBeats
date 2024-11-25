/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RecentlyPlayedCard from '../components/RecentlyPlayedCard';
import SongCard from '../components/SongCard';
import {TrackObject} from '../utils/utility';

export default function Home({
  navigation,
}: {
  navigation: any;
}): React.JSX.Element {
  const [newReleases, setNewReleases] = useState<TrackObject[]>([]);
  const [suggested, setSuggested] = useState<TrackObject[]>([]);
  const numTrack = 5;
  const suggestedArtists = [
    'The Archies',
    'Rupert Gregson-Williams',
    'Beyonce',
    'Jay-Z',
    'Eminem',
    'BTS',
    'Barry Flies Out',
  ];

  const generateRandomIndex = (listReference: any[]) => {
    return Math.floor(Math.random() * listReference.length);
  };

  const generateRandomResults = (tracks: TrackObject[]) => {
    const randomizedResult = [...tracks].sort(() => 0.5 - Math.random());
    return randomizedResult.slice(0, 5);
  };
  // On load, retrieve titles with the current year (Deezer doesn't have search by release_date)
  useEffect(() => {
    const populateNewReleases = async () => {
      try {
        const randomSongList = [];
        const currentYear = new Date().getFullYear().toString();

        const response = await fetch(
          `https://api.deezer.com/search?q=${'-' + currentYear}`,
        );

        const data = await response.json();

        for (let i = 0; i < data.data.length; i++) {
          const newTrackObject: TrackObject = {
            id: data.data[i].id,
            title: data.data[i].title,
            url: data.data[i].url,
            artist: data.data[i].artist.name,
            album: data.data[i].album.title,
            artwork: data.data[i].album.cover_xl,
          };
          randomSongList.push(newTrackObject);
        }

        setNewReleases(generateRandomResults(randomSongList));
      } catch (error) {
        console.log(error);
      }
    };

    populateNewReleases();
  }, []);

  // On load, retrieve initial list of suggested songs from a list of suggested artists
  useEffect(() => {
    const populateSuggested = async () => {
      try {
        const randomSongList: TrackObject[] = [];
        for (let i = 0; i < numTrack; i++) {
          const randomSuggestedArtist =
            suggestedArtists[generateRandomIndex(suggestedArtists)];

          const response = await fetch(
            `https://api.deezer.com/search?q=${randomSuggestedArtist}`,
          );

          // If generated id returns error, proceed with the next one
          if (!response.ok) {
            continue;
          }

          const data = await response.json();

          const artistResults = [];
          for (let j = 0; j < data.data.length; j++) {
            const newTrackObject: TrackObject = {
              id: data.data[j].id,
              title: data.data[j].title,
              url: data.data[j].url,
              artist: data.data[j].artist.name,
              album: data.data[j].album.title,
              artwork: data.data[j].album.cover_xl,
            };
            artistResults.push(newTrackObject);
          }

          const shuffleResults = generateRandomResults(artistResults);
          let randomSong: TrackObject;
          do {
            randomSong = shuffleResults[generateRandomIndex(shuffleResults)];
          } while (randomSongList.find(song => song.id === randomSong.id));

          randomSongList.push(randomSong);
        }
        setSuggested(randomSongList);
      } catch (error) {
        console.log(error);
      }
    };

    populateSuggested();
  }, []);

  const mappedNewReleases = newReleases.map(track => {
    return (
      <TouchableOpacity
        key={track.id}
        onPress={() => navigation.navigate('PLAYING', track)}>
        <SongCard track={track} />
      </TouchableOpacity>
    );
  });

  const mappedSuggested = suggested.map(track => {
    return (
      <TouchableOpacity
        key={track.id}
        onPress={() => navigation.navigate('PLAYING', track)}>
        <SongCard track={track} />
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.sectionLabel}>RECENTLY PLAYED</Text>
      <View style={styles.recentlyPlayed}>
        <RecentlyPlayedCard title="Bee Movie" />
        <RecentlyPlayedCard title="Bee Movie" />
      </View>
      <View style={styles.recentlyPlayed}>
        <RecentlyPlayedCard title="Bee Movie" />
        <RecentlyPlayedCard title="Bee Movie" />
      </View>
      <View style={styles.recentlyPlayed}>
        <RecentlyPlayedCard title="Bee Movie" />
        <RecentlyPlayedCard title="Bee Movie" />
      </View>

      <Text style={styles.sectionLabel}>NEW RELEASES</Text>
      <ScrollView horizontal={true} style={styles.scrollView}>
        {mappedNewReleases}
      </ScrollView>

      <Text style={styles.sectionLabel}>SUGGESTIONS FOR YOU</Text>
      <ScrollView horizontal={true} style={styles.scrollView}>
        {mappedSuggested}
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
  scrollView: {
    paddingVertical: 10,
  },
});
