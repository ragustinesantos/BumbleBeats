/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchResult from '../components/SearchResult';
import {
  defaultPlaylist,
  defaultTrack,
  PlaylistObject,
  TrackObject,
} from '../utils/utility';
import TrackPlayer from 'react-native-track-player';
import {dbUpdateUser} from '../_services/users-service';
import Snackbar from 'react-native-snackbar';

export default function CreatePlaylist({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}): React.JSX.Element {
  const {user, playlistList} = route.params;

  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState<TrackObject[]>([
    {
      ...defaultTrack,
    },
  ]);
  const [tempPlaylist, setTempPlaylist] = useState<PlaylistObject>({
    ...defaultPlaylist,
  });
  const [errors, setErrors] = useState(false);

  const snackError = () => {
    return Snackbar.show({
      text: 'Please provide a unique playlist name and at least 1 song.',
      backgroundColor: '#a81818',
      textColor: '#FFF',
    });
  };

  const savePlaylist = async () => {
    try {
      if (
        tempPlaylist.playlistName &&
        tempPlaylist.tracks &&
        !playlistList.some(
          (playlist: any) =>
            playlist.playlistName === tempPlaylist.playlistName,
        )
      ) {
        await dbUpdateUser(user.id, {
          playlists: [...user.playlists, tempPlaylist],
        });
        navigation.goBack();
      } else {
        setErrors(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Add a list of songs to the queue
  const enqueue = async (tracks: Array<TrackObject>) => {
    // Clear the queue before updating the queue
    await TrackPlayer.reset();

    // Add passed value to the queue
    await TrackPlayer.add(tracks);

    // Log queue
    console.log(await TrackPlayer.getQueue());
  };

  const handleSearchTxt = (newTxt: string) => {
    // Implement search function here
    setSearchVal(newTxt);
  };

  const handleNameTxt = (newTxt: string) => {
    // Implement search function here
    setTempPlaylist(prev => ({...prev, playlistName: newTxt}));
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={async () => {
            await savePlaylist();
          }}>
          <Text style={{color: '#E9A941', fontWeight: '600', fontSize: 16}}>
            Save
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, tempPlaylist]);

  useEffect(() => {
    if (errors) {
      snackError();
      setErrors(false);
    }
  }, [errors]);

  useEffect(() => {
    const search = async () => {
      try {
        const response = await fetch(
          `https://api.deezer.com/search?q=${searchVal}`,
        );

        const data = await response.json();

        let resultData: TrackObject[] = [];
        for (let i = 0; i < data.data.length; i++) {
          const newTrackObject: TrackObject = {
            id: data.data[i].id,
            title: data.data[i].title,
            url: data.data[i].preview,
            artist: data.data[i].artist.name,
            album: data.data[i].album.title,
            artwork: data.data[i].album.cover_xl,
          };
          resultData.push(newTrackObject);
        }

        setSearchResults(resultData);
      } catch (error) {
        console.log(error);
      }
    };

    if (searchVal.length > 0) {
      search();
    }
  }, [searchVal]);

  const mappedSearchResults = (
    <FlatList
      data={searchResults}
      keyExtractor={track => track.id.toString()}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            style={styles.searchResult}
            onPress={() => {
              setTempPlaylist(prev => ({
                ...prev,
                numOfSongs: prev.numOfSongs + 1,
                tracks: [...prev.tracks, item],
              }));
              setSearchVal('');
            }}>
            <SearchResult track={item} />
          </TouchableOpacity>
        );
      }}
    />
  );

  const mappedTempPlaylist = (
    <FlatList
      data={tempPlaylist.tracks}
      keyExtractor={track => track.id.toString()}
      renderItem={({item}) => {
        return (
          <View>
            <TouchableOpacity
              style={styles.playlistResult}
              onPress={async () => {
                await enqueue([item]);
                navigation.navigate('PLAYING', {
                  item,
                  source: 'Create Playlist',
                });
                setSearchVal('');
              }}>
              <SearchResult track={item} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                const updatedTempPlaylist = {
                  ...tempPlaylist,
                  tracks: tempPlaylist.tracks.filter(
                    track => track.id !== item.id,
                  ),
                };
                setTempPlaylist(updatedTempPlaylist);
              }}>
              <Image source={require('../assets/nav-icons/minus-circle.png')} />
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );

  return (
    <View style={styles.pageView}>
      <View style={styles.searchBox}>
        <Image
          style={styles.searchIcon}
          source={require('./../assets/nav-icons/magnifying-glass.png')}
        />

        <TextInput
          placeholder="Select song to add..."
          value={searchVal}
          style={styles.searchInput}
          onChangeText={handleSearchTxt}
        />
      </View>
      {searchResults && searchVal.length > 0 && (
        <View style={styles.searchResultView}>{mappedSearchResults}</View>
      )}
      <View style={styles.playlistInputView}>
        <Text style={styles.nameTxt}>Playlist Name:</Text>
        <TextInput
          placeholder="Enter playlist name..."
          value={tempPlaylist.playlistName}
          style={styles.playlistInput}
          onChangeText={handleNameTxt}
        />
      </View>
      <View>{tempPlaylist ? mappedTempPlaylist : null}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    padding: 10,
  },

  searchBox: {
    height: 45,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#a5a5a5',
  },

  searchIcon: {
    height: 30,
    width: 30,
  },

  searchInput: {
    width: '85%',
    fontSize: 16,
    paddingLeft: 10,
    color: '#000000',
  },

  searchResultView: {
    maxHeight: 480,
    backgroundColor: '#F2F2F2',
    opacity: 0.95,
    borderRadius: 8,
    top: 55,
    left: 10,
    position: 'absolute',
    zIndex: 10,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowColor: '#000',
    shadowRadius: 10,
    elevation: 5,
  },

  searchResult: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 430,
    height: 80,
    padding: 10,
  },

  playlistInputView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  nameTxt: {
    width: '28%',
    fontSize: 16,
    fontWeight: '600',
  },

  playlistInput: {
    width: '72%',
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#a7a7a7',
    marginVertical: 5,
  },

  playlistResult: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 80,
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: '#a7a7a7',
  },

  deleteButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    tintColor: '#222A2C',
  },

  searchImg: {
    height: 60,
    width: 60,
    borderRadius: 8,
    marginRight: 10,
  },

  searchTitle: {
    fontSize: 16,
    fontWeight: '600',
  },

  searchArtist: {
    fontSize: 14,
  },

  label: {
    fontSize: 16,
    fontWeight: '900',
    marginVertical: 10,
    color: '#000000',
  },

  horizontalView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  btnText: {
    color: 'black',
    fontSize: 40,
  },
});
