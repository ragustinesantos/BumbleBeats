import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, { useProgress } from 'react-native-track-player';

export default function ProgressBar(): React.JSX.Element {
  const {position, duration} = useProgress();

  return (
    <View style={styles.container}>
      <Slider
        value={position}
        minimumValue={0}
        maximumValue={duration}
        onValueChange={value => TrackPlayer.seekTo(value)}
        thumbTintColor='#E9A941'
      />
      <View style={styles.timeContainer}>
        <Text style={styles.timeTxt}>{formatTime(position)}</Text>
        <Text style={styles.timeTxt}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

// Time format
const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

const styles = StyleSheet.create({
  container: {
    width: '93%',
  },

  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },

  timeTxt: {
    fontSize: 12,
  },

});
