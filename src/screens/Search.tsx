/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import GenreCard from '../components/GenreCard';
import {defaultTrack, TrackObject} from '../utils/utility';
import TrackPlayer from 'react-native-track-player';
import SearchResult from '../components/SearchResult';
import {FlatList} from 'react-native-gesture-handler';
import {useActiveTrackContext} from '../_utils/queue-context';

export default function Search({
  navigation,
}: {
  navigation: any;
}): React.JSX.Element {
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState<TrackObject[]>([
    {
      ...defaultTrack,
    },
  ]);
  const {activeTrack} = useActiveTrackContext() || {};

  // Add a list of songs to the queue
  const enqueue = async (tracks: Array<TrackObject>) => {
    // Clear the queue before updating the queue
    await TrackPlayer.reset();

    // Add passed value to the queue
    await TrackPlayer.add(tracks);

    // Log queue
    console.log(await TrackPlayer.getQueue());
  };

  function handleChangeTxt(newTxt: string) {
    // Implement search function here
    setSearchVal(newTxt);
  }

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
      } catch (error) {}
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
            onPress={async () => {
              await enqueue([item]);
              navigation.navigate('Playing', {item, source: 'Search'});
              // TODO: Decide whether to using 'Playing' from tab navigator or 'PLAYING' from stack navigator
              setSearchVal('');
            }}>
            <SearchResult track={item} />
          </TouchableOpacity>
        );
      }}
    />
  );

  return (
    <View style={styles.pageContainer}>
      <View style={styles.searchBox}>
        <Image
          style={styles.searchIcon}
          source={require('./../assets/nav-icons/magnifying-glass.png')}
        />

        <TextInput
          placeholder="What are your ears craving for?"
          value={searchVal}
          style={styles.searchInput}
          onChangeText={handleChangeTxt}
        />
      </View>

      {searchResults && searchVal.length > 0 && (
        <View style={styles.searchResultView}>{mappedSearchResults}</View>
      )}

      <Text style={styles.label}>BROWSE CATEGORIES</Text>

      <ScrollView>
        <View style={styles.horizontalView}>
          <GenreCard name="jazz" navigation={navigation} />
          <GenreCard name="hits" navigation={navigation} />
        </View>
        <View style={styles.horizontalView}>
          <GenreCard name="rock" navigation={navigation} />
          <GenreCard name="classical" navigation={navigation} />
        </View>
        <View style={styles.horizontalView}>
          <GenreCard name="playlists" navigation={navigation} />
          <GenreCard name="pop" navigation={navigation} />
        </View>
        <View style={styles.horizontalView}>
          <GenreCard name="blues" navigation={navigation} />
          <GenreCard name="hiphop" navigation={navigation} />
        </View>
        <View style={styles.horizontalView}>
          <GenreCard name="kpop" navigation={navigation} />
          <GenreCard name="radio" navigation={navigation} />
        </View>
        {activeTrack ? <View style={{height: 80}} /> : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 90,
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
    top: 65,
    left: 20,
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
});
