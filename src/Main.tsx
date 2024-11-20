/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import TrackPlayer, {useProgress, RepeatMode} from 'react-native-track-player';
import {defaultTrack, TrackObject} from './utils/utility';

function Main(): React.JSX.Element {
  const [trackObject, setTrackObject] = useState<TrackObject>({
    ...defaultTrack,
  });
  const [trackQueue, setTrackQueue] = useState<TrackObject[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const progress = useProgress();

  useEffect(() => {
    const playerSetup = async () => {
      if (!isInitialized) {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.setRepeatMode(RepeatMode.Off);
        setIsInitialized(true);
      }
    };
    playerSetup();
  }, [isInitialized]);

  useEffect(() => {
    const newTrackObject = {...defaultTrack};

    if (isInitialized) {
      fetch('https://api.deezer.com/track/3135556')
        .then(response => response.json())
        .then(json => {
          newTrackObject.id = json.id;
          newTrackObject.title = json.title;
          newTrackObject.url = json.preview;
          newTrackObject.artist = json.artist.name;
          newTrackObject.album = json.album.title;
          newTrackObject.artwork = json.album.cover_xl;
          setTrackObject(newTrackObject);
        })
        .catch(err => console.log('Error encountered: ' + err));
    }
  }, [isInitialized]);

  useEffect(() => {
    const addTrack = async () => {
      await TrackPlayer.reset();
      await TrackPlayer.add([trackObject]);
      await TrackPlayer.setRepeatMode(RepeatMode.Off);
      console.log(await TrackPlayer.getQueue());
    };

    if (isInitialized && trackObject) {
      addTrack();
    }
  }, [trackObject, isInitialized]);

  return (
    <View>
      <Image
        source={{uri: trackObject.artwork}}
        style={{width: 355, height: 355}}
      />
      <Text>{trackObject.artist}</Text>
      <TouchableOpacity onPress={() => TrackPlayer.seekTo(0)}>
        <Text>Replay</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => TrackPlayer.pause()}>
        <Text>Pause</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => TrackPlayer.play()}>
        <Text>Play</Text>
      </TouchableOpacity>
      <Text>{progress.position}</Text>
      <Text>{progress.buffered}</Text>
    </View>
  );
}

export default Main;
