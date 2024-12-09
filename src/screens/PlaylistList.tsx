/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, FlatList} from 'react-native';
import PlaylistCard from '../components/PlaylistCard';
import {defaultUser, User} from '../utils/utility';
import {useUserAuth} from '../_utils/auth-context';
import {dbGetAllUsers, dbGetUser} from '../_services/users-service';
import {useFocusEffect} from '@react-navigation/native';

export default function PlaylistList({
  navigation,
}: {
  navigation: any;
}): React.JSX.Element {
  const {user} = useUserAuth() || {};
  const [currentUser, setCurrentUser] = useState<User>({...defaultUser});
  const [playlistList, setPlaylistList] = useState<any>([]);

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
    }, [navigation, user]),
  );

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
          <TouchableOpacity
            onPress={() => navigation.navigate('PLAYLIST', item)}>
            <PlaylistCard
              playlistName={item.playlistName}
              numOfSongs={item.numOfSongs}
              artwork={item.tracks[0].artwork}
            />
          </TouchableOpacity>
        );
      }}
    />
  );

  return (
    <View style={styles.pageView}>
      {playlistList ? mappedPlaylists : null}
      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          navigation.navigate('CREATE PLAYLIST', {user: currentUser})
        }>
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    padding: 15,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#E9A941',
    borderRadius: 50,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  btnText: {
    color: '#222A2C',
    fontSize: 40,
  },
});
