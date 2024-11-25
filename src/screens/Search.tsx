import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SearchBar } from 'react-native-screens';
import GenreCard from '../components/GenreCard';

export default function Search(): React.JSX.Element {


  const [searchVal, setSearchVal] = useState("");

  function handleChangeTxt(newTxt: string) {
    // Implement search function here
    setSearchVal(newTxt);
  }

  return (
    <View style={styles.pageContainer}>

      <View style={styles.searchBox}>
        <Image
          style={styles.searchIcon}
          source={require('./../assets/nav-icons/magnifying-glass.png')}
        />

        <TextInput
          placeholder='What are your ears craving for?'
          value={searchVal}
          style={styles.searchInput}
          onChangeText={handleChangeTxt}
        />
      </View>

      <Text style={styles.label}>
        BROWSE CATEGORIES
      </Text>

      <ScrollView>
        <View style={styles.horizontalView}>
          <GenreCard name='JAZZ' icon='' image='jazz' />
          <GenreCard name='HITS' icon='' image='hits' />
        </View>
        <View style={styles.horizontalView}>
          <GenreCard name='ROCK' icon='' image='rock' />
          <GenreCard name='CLASSICAL' icon='' image='classical' />
        </View>
        <View style={styles.horizontalView}>
          <GenreCard name='PLAYLISTS' icon='' image='playlists' />
          <GenreCard name='POP' icon='' image='pop' />
        </View>
        <View style={styles.horizontalView}>
          <GenreCard name='BLUES' icon='' image='blues' />
          <GenreCard name='HIP HOP' icon='' image='hiphop' />
        </View>
        <View style={styles.horizontalView}>
          <GenreCard name='K-POP' icon='' image='kpop' />
          <GenreCard name='RADIO' icon='' image='radio' />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    margin: 20
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
    alignItems: 'center'
  },

  searchIcon: {
    height: 30,
    width: 30,
  },

  searchInput: {
    width: '85%',
    fontSize: 16,
    paddingLeft: 10,
    color: '#000000'
  },

  label: {
    fontSize: 16,
    fontWeight: '900',
    marginVertical: 10,
    color: '#000000'
  },

  horizontalView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  }

});
