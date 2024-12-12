/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import PlaylistCard from '../components/PlaylistCard';
import {defaultUser, User} from '../utils/utility';
import {useUserAuth} from '../_utils/auth-context';
import {
  dbGetAllUsers,
  dbGetUser,
  dbUpdateUser,
} from '../_services/users-service';
import {useFocusEffect} from '@react-navigation/native';
import {useActiveTrackContext} from '../_utils/queue-context';

export default function PlaylistList({
  navigation,
}: {
  navigation: any;
}): React.JSX.Element {
  const {user} = useUserAuth() || {};
  const [currentUser, setCurrentUser] = useState<User>({...defaultUser});
  const [playlistList, setPlaylistList] = useState<any>([]);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const {activeTrack} = useActiveTrackContext() || {};

  useFocusEffect(
    useCallback(() => {
      let matchedUser;
      const retrieveData = async () => {
        try {
          const retrievedUsers = await dbGetAllUsers();
          if (retrievedUsers) {
            matchedUser = retrievedUsers.find(
              current => current.email === user?.email,
            );

            if (matchedUser) {
              const retrievedUser = await dbGetUser(matchedUser.id);
              if (retrievedUser) {
                setCurrentUser(retrievedUser);
                setPlaylistList(retrievedUser.playlists);
              }
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
      retrieveData();
    }, [navigation, user, refreshKey]),
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CREATE PLAYLIST', {
              user: currentUser,
              playlistList: playlistList,
            })
          }>
          <Image
            source={require('../assets/nav-icons/plus-circle.png')}
            style={{tintColor: '#E9A941'}}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, playlistList]);

  const handleDelete = async (playlistName: string) => {
    try {
      const updatedPlaylists = {
        playlists: playlistList.filter(
          (playlist: any) => playlist.playlistName !== playlistName,
        ),
      };
      await dbUpdateUser(currentUser.id, updatedPlaylists);
      console.log('Playlist deleted');
    } catch (error) {
      console.log(error);
    }
  };

  const mappedPlaylists = (
    <FlatList
      columnWrapperStyle={{
        width: '100%',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 15,
      }}
      contentContainerStyle={{}}
      numColumns={2}
      data={playlistList}
      keyExtractor={item => item.tracks[0].id}
      renderItem={({item}) => {
        return (
          <View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                handleDelete(item.playlistName);
                setRefreshKey(prev => prev + 1);
              }}>
              <Image
                source={require('../assets/nav-icons/trash.png')}
                style={styles.trashIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('PLAYLIST', item)}>
              <PlaylistCard
                playlistName={item.playlistName}
                numOfSongs={item.numOfSongs}
                artwork={item.tracks[0].artwork}
              />
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );

  return (
    <View style={styles.pageView}>
      {playlistList ? mappedPlaylists : null}
      {activeTrack ? <View style={{height: 65}} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    padding: 10,
  },
  trashIcon: {tintColor: '#222A2C', height: 24, width: 24},
  deleteButton: {
    position: 'absolute',
    zIndex: 50,
    right: 10,
    top: 10,
    borderRadius: 50,
    backgroundColor: '#F2F2F2',
    padding: 3,
    elevation: 4,
  },
  btnText: {
    color: '#222A2C',
    fontSize: 40,
  },
});
