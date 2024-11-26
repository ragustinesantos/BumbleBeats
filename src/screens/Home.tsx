/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import RecentlyPlayedCard from '../components/RecentlyPlayedCard';
import SongCard from '../components/SongCard';
import {TrackObject} from '../utils/utility';
import TrackPlayer from 'react-native-track-player';

export default function Home({
  navigation,
}: {
  navigation: any;
}): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [newReleases, setNewReleases] = useState<TrackObject[]>([]);
  const [suggested, setSuggested] = useState<TrackObject[]>([]);
  const numTrack = 10;
  const suggestedArtists = [
    'The Archies',
    'Rupert Gregson-Williams',
    'Beyonce',
    'Jay-Z',
    'Eminem',
    'BTS',
    'Barry Flies Out',
  ];

  // Add a list of songs to the queue
  const enqueue = async (tracks: Array<TrackObject>) => {
    // Clear the queue before updating the queue
    await TrackPlayer.reset();

    // Add passed value to the queue
    await TrackPlayer.add(tracks);

    // Log queue
    console.log(await TrackPlayer.getQueue());
  };

  const generateRandomIndex = (listReference: any[]) => {
    return Math.floor(Math.random() * listReference.length);
  };

  const generateRandomResults = (tracks: TrackObject[]) => {
    const randomizedResult = [...tracks].sort(() => 0.5 - Math.random());
    return randomizedResult.slice(0, numTrack);
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
            url: data.data[i].preview,
            artist: data.data[i].artist.name,
            album: data.data[i].album.title,
            artwork: data.data[i].album.cover_xl,
          };
          randomSongList.push(newTrackObject);
        }

        setNewReleases(generateRandomResults(randomSongList));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    setIsLoading(true);
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

          if (!response.ok) {
            continue;
          }

          const data = await response.json();

          const artistResults = [];
          for (let j = 0; j < data.data.length; j++) {
            const newTrackObject: TrackObject = {
              id: data.data[j].id,
              title: data.data[j].title,
              url: data.data[j].preview,
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
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    setIsLoading(true);
    populateSuggested();
  }, []);

  const mappedTracks = (source: TrackObject[]) => {
    return (
      <FlatList
        data={source}
        style={styles.listView}
        keyExtractor={track => track.id.toString()}
        horizontal={true}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={async () => {
                await enqueue([item]);
                navigation.navigate('PLAYING', {item, source: 'Home'});
              }}>
              <SongCard track={item} />
            </TouchableOpacity>
          );
        }}
      />
    );
  };

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
      <View>
        {isLoading ? (
          <Image
            style={styles.loadingGif}
            source={require('../assets/loading/bee.gif')}
          />
        ) : (
          mappedTracks(newReleases)
        )}
      </View>

      <Text style={styles.sectionLabel}>SUGGESTIONS FOR YOU</Text>
      <View>
        {isLoading ? (
          <Image
            style={styles.loadingGif}
            source={require('../assets/loading/bee.gif')}
          />
        ) : (
          mappedTracks(suggested)
        )}
      </View>
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

  loadingGif: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 150,
    width: 150,
  },

  recentlyPlayed: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listView: {
    paddingVertical: 10,
  },
});
