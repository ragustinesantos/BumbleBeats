/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import SongListCard from '../components/SongListCard';
import TrackPlayer from 'react-native-track-player';
import {TrackObject} from '../utils/utility';
import {useActiveTrackContext} from '../_utils/queue-context';
import { useFocusEffect } from '@react-navigation/native';

export default function PlaylistAccessed({
  route,
}: {
  route: any;
}): React.JSX.Element {
  const {playlistName, numOfSongs, tracks} = route.params;
  const {setIsPlayingScreen} = useActiveTrackContext() || {};

  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [search, setSearch] = useState('');
  const [foundSongs, setFoundSongs] = useState<TrackObject[]>(tracks);
  const [currentlyPlayingSong, setCurrentlyPlayingSong] =
    useState<TrackObject | null>(null);

  const handleSearch = (entered: string) => {
    setSearch(entered);
    const lowercasedQuery = entered.toLowerCase();
    const filtered = tracks.filter(
      (track: TrackObject) =>
        track.title.toLowerCase().includes(lowercasedQuery) ||
        track.artist.toLowerCase().includes(lowercasedQuery),
    );
    setFoundSongs(filtered);
  };

  const handlePlayPress = async () => {
    try {
      if (tracks.length === 0) {
        console.warn('No tracks in the playlist');
        return;
      }

      if (isPlaying) {
        await TrackPlayer.pause();
      } else {
        const trackPlayerTracks = tracks.map((track: TrackObject) => ({
          id: track.id,
          url: track.url,
          title: track.title,
          artist: track.artist,
          artwork: track.artwork,
        }));

        await TrackPlayer.reset();
        await TrackPlayer.add(trackPlayerTracks);
        await TrackPlayer.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleShufflePress = async () => {
    if (!isShuffling) {
      const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5);
      await TrackPlayer.reset();
      await TrackPlayer.add(shuffledTracks);
      if (isPlaying) {
        await TrackPlayer.play();
      }
    }
    setIsShuffling(!isShuffling);
  };

  const handleSongPress = async (item: TrackObject) => {
    console.log('Song pressed:', item.title);
    console.log('Currently playing song:', currentlyPlayingSong?.title);

    try {
      const trackToPlay = {
        id: item.id.toString(),
        url: item.url,
        title: item.title,
        artist: item.artist,
        artwork: item.artwork,
      };

      if (currentlyPlayingSong && currentlyPlayingSong.id === item.id) {
        await TrackPlayer.pause();
        setCurrentlyPlayingSong(null);
        return;
      }

      await TrackPlayer.stop();
      await TrackPlayer.reset();

      await TrackPlayer.add(trackToPlay);
      await TrackPlayer.play();

      setCurrentlyPlayingSong(item);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (setIsPlayingScreen) {
        setIsPlayingScreen(false);
      }
    }, [setIsPlayingScreen]),
  );

  return (
    <View style={style.container}>
      <View style={style.searchContainer}>
        <TextInput
          style={style.searchInputBox}
          placeholder="Search Song..."
          value={search}
          onChangeText={handleSearch}
        />
        <Image source={require('../assets/nav-icons/magnifying-glass.png')} />
      </View>

      <View style={style.playlistContainer}>
        <Image
          source={
            tracks.length > 0 && tracks[0].artwork
              ? {uri: tracks[0].artwork}
              : require('../assets/playlist/default-art.png')
          }
          style={style.playlistArtwork}
        />
        <View style={style.txtContainer}>
          <Text style={style.playlistName}>{playlistName}</Text>
          <Text style={style.numOfSongs}>{numOfSongs} Songs</Text>
        </View>
      </View>

      <View style={style.btnContainer}>
        <TouchableOpacity
          style={[
            style.playBtn,
            isPlaying
              ? {backgroundColor: '#E9A941'}
              : {backgroundColor: '#002538'},
          ]}
          onPress={handlePlayPress}>
          <Image
            style={style.btnIcon}
            source={require('../assets/nav-icons/play-white.png')}
          />
          <Text style={style.btnTxt}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            style.shuffleBtn,
            isShuffling
              ? {backgroundColor: '#E9A941'}
              : {backgroundColor: '#002538'},
          ]}
          onPress={handleShufflePress}>
          <Image
            style={style.btnIcon}
            source={require('../assets/nav-icons/shuffle-angular-white.png')}
          />
          <Text style={style.btnTxt}>Shuffle</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={style.songList}
        data={foundSongs}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <SongListCard
            artwork={item.artwork}
            title={item.title}
            artist={item.artist}
            isPlaying={currentlyPlayingSong?.id === item.id}
            onPress={() => handleSongPress(item)}
          />
        )}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 1,
    borderColor: 'gray',
  },

  searchInputBox: {
    flex: 1,
    fontSize: 14,
    padding: 5,
  },

  playlistContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '94%',
    height: 150,
    alignSelf: 'center',
    borderRadius: 5,
    marginVertical: 50,
  },

  playlistArtwork: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },

  txtContainer: {
    width: '100%',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#002538',
  },

  playlistName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    paddingLeft: 8,
    paddingTop: 5,
  },

  numOfSongs: {
    color: 'white',
    fontSize: 12,
    fontWeight: '400',
    paddingBottom: 5,
    paddingLeft: 8,
  },

  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: 10,
    alignItems: 'center',
  },

  playBtn: {
    backgroundColor: '#002538',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '49%',
    height: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },

  shuffleBtn: {
    backgroundColor: '#002538',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '49%',
    height: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },

  btnIcon: {
    marginRight: 5,
  },

  btnTxt: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 10,
  },

  songList: {
    paddingHorizontal: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
});
