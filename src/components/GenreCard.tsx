import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type genreCardParameters = {
  name: string,
  image: string,
  icon: string,
}

export default function GenreCard(params: genreCardParameters): React.JSX.Element {

  const images = {
    jazz: require('./../../assets/genres/jazz.jpeg'),
    hits: require('./../../assets/genres/hits.png'),
    rock: require('./../../assets/genres/rock.jpg'),
    classical: require('./../../assets/genres/classical.jpg'),
    playlists: require('./../../assets/genres/playlist.png'),
    pop: require('./../../assets/genres/pop.png'),
    blues: require('./../../assets/genres/blues.png'),
    hiphop: require('./../../assets/genres/hiphop.png'),
    kpop: require('./../../assets/genres/kpop.png'),
    radio: require('./../../assets/genres/radio.png'),
  };

  type ImageKeys = keyof typeof images;

  const icons = {
    jazz: require('./../../assets/genres/icons/jazz.png'),
    hits: require('./../../assets/genres/icons/hits.png'),
    rock: require('./../../assets/genres/icons/rock.png'),
    classical: require('./../../assets/genres/icons/classical.png'),
    playlists: require('./../../assets/genres/icons/playlist.png'),
    pop: require('./../../assets/genres/icons/pop.png'),
    blues: require('./../../assets/genres/icons/blues.png'),
    hiphop: require('./../../assets/genres/icons/hiphop.png'),
    kpop: require('./../../assets/genres/icons/kpop.png'),
    radio: require('./../../assets/genres/icons/radio.png'),
  };

  return (
    <View style={styles.genreContainer}>

      <Image
        style={styles.genreImg}
        source={images[params.image as ImageKeys]}
      />

      <View style={styles.labelContainer}>
        <Text style={styles.genreName}>
          {params.name}
        </Text>
        <Image
          style={styles.genreIcon}
          source={icons[params.image as ImageKeys]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  genreContainer: {
    height: 180,
    width: 180,
    borderWidth: 1,
    borderRadius: 6,
  },

  genreImg: {
    height: '70%',
    width: '100%',
    borderWidth: 1,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },

  labelContainer: {
    height: '30%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#002538',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  genreName: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600'
  },

  genreIcon: {
    height: 35,
    width: 35,
    tintColor: '#FFFFFF',
  }
});
