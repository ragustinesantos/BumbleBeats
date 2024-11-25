import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import SongCard from '../components/SongCard';
import SongListCard from '../components/SongListCard';


type Song = {
  id: string;
  title: string;
  artist: string;
  artwork: string;
};

// Fake data for liked songs -- testing
const likedSongs: Song[] = [
  {
    id: '1',
    title: 'Song Title',
    artist: 'Artist',
    artwork: '',
  },

];

export default function Profile(): React.JSX.Element {

  return (
    <View style={style.container}>
      <View style={style.profileContainer}>
        <Image
          source={{uri: ''}}
          style={style.profilePic}
        />
        <Text style={style.userName}>Name</Text>
        <View style={style.stats}>
          <Text style={style.statTxt}>
            <Text style={style.statNum}>0</Text> Playlists
          </Text>
          <Text style={style.statTxt}>
            <Text style={style.statNum}>0</Text> Liked Songs
          </Text>
        </View>
      </View>

      <Text style={style.likedSongsTitle}>Your Liked Songs</Text>
      <FlatList
        data={likedSongs}
        renderItem={({ item }) => (
          <SongListCard
            artwork={item.artwork}
            title={item.title}
            artist={item.artist}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={style.songList}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },

  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },

  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },

  statTxt: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },

  statNum: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  likedSongsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  songList: {
    paddingBottom: 20,
  },

});
