/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
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
import {recentlyPlayedTrack, TrackObject} from '../utils/utility';
import TrackPlayer from 'react-native-track-player';
import {useFocusEffect} from '@react-navigation/native';
import {dbGetAllUsers, dbGetUser} from '../_services/users-service';
import {useUserAuth} from '../_utils/auth-context';
import {useActiveTrackContext} from '../_utils/queue-context';
import {ScrollView} from 'react-native-gesture-handler';

export default function Home({
  navigation,
}: {
  navigation: any;
}): React.JSX.Element {
  const {activeTrack, setIsPlayingScreen} = useActiveTrackContext() || {};

  const [isLoading, setIsLoading] = useState(true);
  const [recentlyPlayed, setRecentlyPlayed] = useState<TrackObject[]>([]);
  const [newReleases, setNewReleases] = useState<TrackObject[]>([]);
  const [suggested, setSuggested] = useState<TrackObject[]>([]);
  const numTrack = 10;
  const suggestedArtists = [
    'The Archies',
    'Rupert Gregson-Williams',
    'Flowers',
    'Bee Gees',
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
  };

  const generateRandomIndex = (listReference: any[]) => {
    return Math.floor(Math.random() * listReference.length);
  };

  const generateRandomResults = (tracks: TrackObject[]) => {
    const randomizedResult = [...tracks].sort(() => 0.5 - Math.random());
    return randomizedResult.slice(0, numTrack);
  };

  const {user} = useUserAuth() || {};

  // This is to reload the recently played each time since the user can play music from anywhere
  useFocusEffect(
    useCallback(() => {
      const populateRecentlyPlayed = async () => {
        try {
          // Retrieves the user record and their recently played from the database
          let matchedUser;
          let userRecentlyPlayed: recentlyPlayedTrack[] = [];
          const retrievedUsers = await dbGetAllUsers();
          if (retrievedUsers) {
            matchedUser = retrievedUsers.find(
              current => current.email === user?.email,
            );
            if (matchedUser) {
              const retrievedUser = await dbGetUser(matchedUser.id);
              if (retrievedUser) {
                userRecentlyPlayed = retrievedUser.recentlyPlayed;
              }
            }
          }

          const recentSongList: TrackObject[] = [];

          // Retrieves information for each track
          for (let i = 0; i < userRecentlyPlayed.length; i++) {
            const response = await fetch(
              `https://api.deezer.com/track/${userRecentlyPlayed[i].trackId}`,
            );

            const data = await response.json();

            const newTrackObject: TrackObject = {
              id: data.id,
              title: data.title,
              url: data.preview,
              artist: data.artist.name,
              album: data.album.title,
              artwork: data.album.cover_xl,
            };
            recentSongList.push(newTrackObject);
          }

          setRecentlyPlayed(recentSongList);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      setIsLoading(true);
      populateRecentlyPlayed();
    }, [user]),
  );

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

  useFocusEffect(
    useCallback(() => {
      if (setIsPlayingScreen) {
        setIsPlayingScreen(false);
      }
    }, [setIsPlayingScreen]),
  );

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
                navigation.navigate('Playing', {item, source: 'Home'});
              }}>
              <SongCard track={item} />
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  return (
    <ScrollView style={styles.pageContainer}>
      <Text style={styles.sectionLabel}>RECENTLY PLAYED</Text>
      {isLoading ? (
        <Image
          style={styles.loadingGif}
          source={require('../assets/loading/bee.gif')}
        />
      ) : recentlyPlayed.length > 0 ? (
        <View style={styles.recentlyPlayed}>
          {recentlyPlayed.map((song, index) => (
            <TouchableOpacity
              key={index}
              onPress={async () => {
                await enqueue([song]);
                navigation.navigate('Playing', {song, source: 'Home'});
              }}>
              <RecentlyPlayedCard
                key={index}
                title={song.title}
                artwork={song.artwork}
              />
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text>Go listen to some music!</Text>
      )}

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
      {activeTrack ? <View style={{height: 80}} /> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    margin: 10,
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
    flexWrap: 'wrap',
  },
  listView: {
    paddingVertical: 10,
  },
});
