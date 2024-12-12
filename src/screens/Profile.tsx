import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import SongListCard from '../components/SongListCard';
import { TrackObject, defaultUser, User } from '../utils/utility';
import { useUserAuth } from '../_utils/auth-context';
import { dbGetAllUsers, dbGetUser, dbGetLikedTracks } from '../_services/users-service';
import TrackPlayer from 'react-native-track-player';

export default function Profile({ navigation }: { navigation: any }): React.JSX.Element {
  const { user } = useUserAuth() || {};
  const [likedTracks, setLikedTracks] = useState<TrackObject[]>([]);
  const [playlistCount, setPlaylistCount] = useState(0);
  const [displayName, setDisplayName] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<User>({...defaultUser});

  useEffect(() => {
    const fetchLikedTracks = async () => {
      if (!user) return;

      try {
        const tracks = await dbGetLikedTracks(user.uid);
        setLikedTracks(tracks);
      } catch (error) {
        console.error('Error fetching liked tracks:', error);
      }
    };

    const fetchUserDetails = async () => {
      if (!user) return;

      try {
        // First, find the user by email
        const retrievedUsers = await dbGetAllUsers();
        const matchedUser = retrievedUsers.find(
          (current: User) => current.email === user.email
        );

        console.log('All Users:', retrievedUsers);
        console.log('Matched User:', matchedUser);
        console.log('Current User Email:', user.email);

        if (matchedUser) {
          const userData = await dbGetUser(matchedUser.id);
          
          console.log('User Data:', userData);
          console.log('Playlists:', userData?.playlists);

          const playlistsLength = userData?.playlists ? userData.playlists.length : 0;
          console.log('Playlist Count:', playlistsLength);
          
          setPlaylistCount(playlistsLength);
          setDisplayName(userData?.email || user.email || 'User');
        } else {
          const userData = await dbGetUser(user.uid);
          
          console.log('Fallback User Data:', userData);
          console.log('Fallback Playlists:', userData?.playlists);

          const playlistsLength = userData?.playlists ? userData.playlists.length : 0;
          console.log('Fallback Playlist Count:', playlistsLength);
          
          setPlaylistCount(playlistsLength);
          setDisplayName(user.email || 'User');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchLikedTracks();
    fetchUserDetails();

    const likedTracksUnsubscribe = navigation.addListener('focus', fetchLikedTracks);
    const userDetailsUnsubscribe = navigation.addListener('focus', fetchUserDetails);

    return () => {
      likedTracksUnsubscribe();
      userDetailsUnsubscribe();
    };
  }, [navigation, user]);

  const handleSongPress = (track: TrackObject) => {
    navigation.navigate('Playing', { 
      track: track,
      source: 'Profile'
    });
  };

  return (
    <View style={style.container}>
      <View style={style.profileContainer}>
        <Image
          source={require('../assets/profile/default-profile.jpg')}
          style={style.profilePic}
        />
        <Text style={style.userName}>{displayName || 'User'}</Text>
        <View style={style.stats}>
          <Text style={style.statTxt}>
            <Text style={style.statNum}>{playlistCount}</Text> Playlists
          </Text>
          <Text style={style.statTxt}>
            <Text style={style.statNum}>{likedTracks.length}</Text> Liked Songs
          </Text>
        </View>
      </View>

      <Text style={style.likedSongsTitle}>Your Liked Songs</Text>
      <FlatList
        data={likedTracks}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSongPress(item)}>
            <SongListCard
              artwork={item.artwork}
              title={item.title}
              artist={item.artist}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={style.songList}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    color: 'black',
    marginBottom: 10,
  },

  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },

  statTxt: {
    fontSize: 14,
    color: 'black',
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
