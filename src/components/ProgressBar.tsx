import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, {useProgress} from 'react-native-track-player';

export default function ProgressBar(): React.JSX.Element {
  const {position, duration} = useProgress();

  const roundedPosition = Math.floor(position);
  const roundedDuration = Math.floor(duration);

const formattedDuration = roundedDuration && !isNaN(roundedDuration) ? formatTime(roundedDuration) : '00:00';

  return (
    <View style={styles.container}>
      <Slider
        value={roundedPosition}
        minimumValue={0}
        maximumValue={roundedDuration}
        onValueChange={value => TrackPlayer.seekTo(value)}
        thumbTintColor="#E9A941"
      />
      <View style={styles.timeContainer}>
        <Text style={styles.timeTxt}>{formatTime(roundedPosition)}</Text>
        <Text style={styles.timeTxt}>{formattedDuration}</Text>
      </View>
    </View>
  );
}

// Time format
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedSeconds = (seconds % 60).toString().padStart(2, '0');

  return `${paddedMinutes}:${paddedSeconds}`;
};

const styles = StyleSheet.create({
  container: {
    width: '93%',
  },

  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },

  timeTxt: {
    fontSize: 12,
  },
});
