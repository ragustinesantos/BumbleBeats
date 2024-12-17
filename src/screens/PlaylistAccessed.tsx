/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-catch-shadow */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState} from 'react';
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
import {TrackObject} from '../utils/utility';
import {useActiveTrackContext} from '../_utils/queue-context';
import TrackPlayer from 'react-native-track-player';

export default function PlaylistAccessed({
  route,
}: {
  route: any;
}): React.JSX.Element {
  const {activeTrack, togglePlayPause, playing, setPlaying} =
    useActiveTrackContext() || {};

  const item = route.params;
  const playlistName = item.playlistName;
  const numOfSongs = item.numOfSongs;
  const tracks = item.tracks;

  const [isShuffling, setIsShuffling] = useState(false);
  const [search, setSearch] = useState('');
  const [foundSongs, setFoundSongs] = useState<TrackObject[]>(tracks);

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

      // Using global toggle play/pause
      if (playing) {
        if (togglePlayPause) {
          await togglePlayPause();
        } else {
          await TrackPlayer.pause();
        }
        return;
      }

      // fetching tracks
      let trackPlayerTracks: TrackObject[] = [];
      for (let i = 0; i < tracks.length; i++) {
        try {
          const response = await fetch(
            `https://api.deezer.com/track/${tracks[i].id}`,
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
          trackPlayerTracks.push(newTrackObject);
        } catch (error) {
          trackPlayerTracks.push(tracks[i]);
        }
      }

      await TrackPlayer.stop();
      await TrackPlayer.reset();

      await TrackPlayer.add(trackPlayerTracks);
      await TrackPlayer.play();

      if (setPlaying) {
        setPlaying(true);
      }
    } catch (error) {
      console.error('Error playing playlist');
    }
  };

  const handleShufflePress = async () => {
    try {
      if (tracks.length === 0) {
        console.warn('No tracks in the playlist');
        return;
      }

      if (isShuffling) {
        await TrackPlayer.stop();
        await TrackPlayer.reset();

        await TrackPlayer.add(tracks);

        if (playing) {
          await TrackPlayer.play();
        }

        setIsShuffling(false);
        return;
      }

      // Shuffle tracks
      const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5);

      // Fetching tracks
      let shuffledTrackPlayerTracks: TrackObject[] = [];
      for (let i = 0; i < shuffledTracks.length; i++) {
        try {
          const response = await fetch(
            `https://api.deezer.com/track/${shuffledTracks[i].id}`,
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
          shuffledTrackPlayerTracks.push(newTrackObject);
        } catch (error) {
          shuffledTrackPlayerTracks.push(shuffledTracks[i]);
        }
      }

      await TrackPlayer.stop();
      await TrackPlayer.reset();

      await TrackPlayer.add(shuffledTrackPlayerTracks);
      await TrackPlayer.play();

      setIsShuffling(true);

      if (setPlaying) {
        setPlaying(true);
      }
    } catch (error) {
      console.error('Error shuffling playlist');
      setIsShuffling(false);
    }
  };

  const handleSongPress = async (item: TrackObject) => {
    try {
      // Fetching tracks
      const response = await fetch(`https://api.deezer.com/track/${item.id}`);
      const songData = await response.json();

      const trackToPlay = {
        id: songData.id.toString(),
        url: songData.preview,
        title: songData.title,
        artist: songData.artist.name,
        artwork: songData.album.cover_xl,
      };

      await TrackPlayer.stop();
      await TrackPlayer.reset();
      await TrackPlayer.add(trackToPlay);
      await TrackPlayer.play();

      if (setPlaying) {
        setPlaying(true);
      }
    } catch (error) {
      console.error('Error fetching or playing.');
      try {
        const trackToPlay = {
          id: item.id.toString(),
          url: item.url,
          title: item.title,
          artist: item.artist,
          artwork: item.artwork,
        };

        await TrackPlayer.stop();
        await TrackPlayer.reset();
        await TrackPlayer.add(trackToPlay);
        await TrackPlayer.play();

        if (setPlaying) {
          setPlaying(true);
        }
      } catch (error) {
        console.error('Playing failed.');
      }
    }
  };

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
            playing
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
            isPlaying={activeTrack?.id === item.id.toString()}
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
