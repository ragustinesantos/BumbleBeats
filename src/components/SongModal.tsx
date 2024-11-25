import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';


type SongModalParams = {
  artwork: string,
  title: string,
  artist: string,
  isVisible: boolean,
};

export default function SongModal(params: SongModalParams): React.JSX.Element {
  const artwork = params.artwork;
  const title = params.title;
  const artist = params.artist;
  const isVisible = params.isVisible;

  // Need to implement visibility
  //if (!isVisible) return null;

  const handleExpand = () => {
    //Expand the player to the Playing screen
  };

  return (
    <TouchableOpacity style={style.container} onPress={handleExpand}>
      <Image
        source={{uri: artwork}}
        style={style.artwork}
      />
      <View style={style.infoContainer}>
        <Text style={style.title}>
          {title}
        </Text>
        <Text style={style.artist}>
          {artist}
        </Text>
      </View>
        <TouchableOpacity onPress={() => TrackPlayer.play()}>
          <Image
            source={require('../assets/nav-icons/play.png')}
            style={style.pausePlay}
          />
        </TouchableOpacity>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#002538',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'white',
  },

  artwork: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: 'white',
  },

  infoContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },

  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },

  artist: {
    fontSize: 12,
    color: '#B0B0B0',
  },

  pausePlay: {
    width: 20,
    height: 20,
    tintColor: 'white',
    marginLeft: 10,
    marginRight: 10
  },
});
