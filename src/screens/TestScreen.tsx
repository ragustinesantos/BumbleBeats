/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import TrackPlayer, {useProgress, RepeatMode} from 'react-native-track-player';
import {defaultTrack, TrackObject} from '../utils/utility';
import PlaylistCard from '../components/PlaylistCard';
import SongModal from '../components/SongModal';

export default function TestScreen(): React.JSX.Element {
  const [trackToPlay, setTrackToPlay] = useState<TrackObject>({
    ...defaultTrack,
  });
  const [playlists, setPlaylists] = useState([]);
  const [playlistToPlay, setPlaylistToPlay] = useState<Array<TrackObject>>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const progress = useProgress();

  // Add a list of songs to the queue
  const enqueue = async (tracks: Array<TrackObject>) => {
    // Clear the queue before updating the queue
    await TrackPlayer.reset();

    // Add passed value to the queue
    await TrackPlayer.add(tracks);

    // Log queue
    console.log(await TrackPlayer.getQueue());
  };

  // On load, set up player
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

  // Can be deleted. Just getting a sample track from the api for testing
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
          setTrackToPlay(newTrackObject);
        })
        .catch(err => console.log('Error encountered: ' + err));
    }
  }, [isInitialized]);

  // Can be deleted. Just queueing a sample track from the api for testing
  useEffect(() => {
    if (isInitialized && trackToPlay) {
      enqueue([trackToPlay]);
    }
  }, [trackToPlay, isInitialized]);


  const playlist = {
    playlistName: 'Chill Vibes',
    numOfSongs: 14,
    tracks: [
      {
        id: 1,
        title: 'Song 1',
        url: 'https://example.com/song1.mp3',
        artist: 'Artist',
        album: 'Album',
        artwork: 'https://via.placeholder.com/150',
      },
    ],
  };

  return (
    <View>
      <Image
        source={{uri: trackToPlay.artwork}}
        style={{width: 355, height: 355}}
      />
      <Text>{trackToPlay.artist}</Text>
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
      {/* <PlaylistCard
        playlistName={playlist.playlistName}
        numOfSongs={playlist.numOfSongs}
        artwork={playlist.tracks[0].artwork}
        onPress={() => console.log('Playlist card pressed')}
      /> */}

      <SongModal
        isVisible={modalVisible}
        artwork={trackToPlay.artwork}
        title={trackToPlay.title}
        artist={trackToPlay.artist}
      />
    </View>
  );
}
