/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import ProgressBar from '../components/ProgressBar';
import {useFocusEffect} from '@react-navigation/native';
import {useUserAuth} from '../_utils/auth-context';
import {TrackObject, recentlyPlayedTrack} from '../utils/utility';
import {
  dbGetAllUsers,
  dbGetUser,
  dbUpdateUser,
} from '../_services/users-service';
import {useActiveTrackContext} from '../_utils/queue-context';

export default function Playing({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}): React.JSX.Element {
  const {source} = route.params;
  const {
    activeTrack,
    skipToNext,
    skipToPrevious,
    toggleLoop,
    togglePlayPause,
    isLooping,
    playing,
    setPlaying,
    setIsPlayingScreen,
  } = useActiveTrackContext() || {};

  const {user} = useUserAuth() || {};

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (source === 'Home') {
      navigation.setOptions({
        headerLeft: undefined,
      });
    }
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      if (setIsPlayingScreen) {
        setIsPlayingScreen(true);
      }
    }, [setIsPlayingScreen]),
  );

  // Triggers a re-render when the screen comes into focus or selected
  // Used to update the Playing Screen on TabNav with the information on the Active Track
  useFocusEffect(
    useCallback(() => {
      const fetchTrack = async () => {
        try {
          if (activeTrack) {
            TrackPlayer.play();
            if (setPlaying) {
              setPlaying(true);
            }

            // Retrieves the user record from the database
            let matchedUser;
            const retrievedUsers = await dbGetAllUsers();
            if (retrievedUsers) {
              matchedUser = retrievedUsers.find(
                current => current.email === user?.email,
              );
              if (matchedUser) {
                const retrievedUser = await dbGetUser(matchedUser.id);
                if (retrievedUser) {
                  // This entire section updates the recently played.
                  let userRecentlyPlayed: recentlyPlayedTrack[] =
                    retrievedUser.recentlyPlayed;

                  if (
                    !userRecentlyPlayed.some(
                      track => track.trackId === activeTrack.id,
                    )
                  ) {
                    // It should only store 6 tracks so the oldest track gets removed when it is already at 6.
                    if (userRecentlyPlayed.length > 5) {
                      userRecentlyPlayed = userRecentlyPlayed.filter(
                        track => track.playOrder !== 1,
                      );
                      userRecentlyPlayed = userRecentlyPlayed.map(track => {
                        const newTrack: recentlyPlayedTrack = {
                          playOrder: track.playOrder - 1,
                          trackId: track.trackId,
                        };
                        return newTrack;
                      });
                    }
                    const newSong: recentlyPlayedTrack = {
                      playOrder: userRecentlyPlayed.length + 1,
                      trackId: activeTrack.id,
                    };
                    // Adds the new song to the array and updates the database
                    userRecentlyPlayed.push(newSong);
                    const updatedRecentlyPlayed = {
                      recentlyPlayed: userRecentlyPlayed,
                    };
                    await dbUpdateUser(matchedUser.id, updatedRecentlyPlayed);
                  }
                }
              }
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchTrack();
    }, [activeTrack]),
  );

  const handleLikeSong = async () => {
    if (!user) {
      return;
    }

    try {
      const userData = await dbGetUser(user.uid);
      if (userData) {
        const currentTrack = await TrackPlayer.getActiveTrack();
        if (!currentTrack) {
          return;
        }

        const trackObject: TrackObject = {
          id: currentTrack.id ?? '',
          title: currentTrack.title ?? 'Unknown Title',
          url: currentTrack.url ?? '',
          artist: currentTrack.artist ?? 'Unknown Artist',
          album: currentTrack.album ?? 'Unknown Album',
          artwork: currentTrack.artwork ?? '',
        };

        let updatedLikedTracks: TrackObject[];
        if (isLiked) {
          // Remove song from liked tracks
          updatedLikedTracks = userData.likedTracks.filter(
            (song: TrackObject) => song.id !== trackObject.id,
          );
        } else {
          // Add song to liked tracks
          updatedLikedTracks = [...userData.likedTracks, trackObject];
        }

        // Update user in database
        await dbUpdateUser(user.uid, {
          likedTracks: updatedLikedTracks,
        });

        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.log('Error updating liked songs:', error);
    }
  };

  return (
    <View style={style.container}>
      <Image
        source={
          activeTrack?.artwork
            ? {uri: activeTrack?.artwork}
            : {uri: 'https://via.placeholder.com/150'}
        }
        style={style.art}
      />

      <View style={style.trackInfo}>
        <Text style={style.title}>{activeTrack?.title}</Text>
        <Text style={style.artist}>{activeTrack?.artist}</Text>
      </View>

      <ProgressBar />

      <View style={style.controls}>
        <TouchableOpacity onPress={toggleLoop} style={style.controlBtn}>
          <View style={style.loopContainer}>
            <Image
              source={require('../assets/nav-icons/repeat.png')}
              style={style.extraControlIcon}
            />

            <View>{isLooping && <View style={style.loopIndicator} />}</View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={skipToPrevious} style={style.controlBtn}>
          <Image
            source={require('../assets/nav-icons/skip-back.png')}
            style={style.secondaryControlIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlayPause} style={style.controlBtn}>
          <Image
            source={
              playing
                ? require('../assets/nav-icons/pause.png')
                : require('../assets/nav-icons/play.png')
            }
            style={style.primaryControlIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={skipToNext} style={style.controlBtn}>
          <Image
            source={require('../assets/nav-icons/skip-forward.png')}
            style={style.secondaryControlIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLikeSong} style={style.controlBtn}>
          <Image
            source={
              isLiked
                ? require('../assets/nav-icons/heart-filled.png')
                : require('../assets/nav-icons/heart.png')
            }
            style={style.extraControlIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  art: {
    width: 350,
    height: 350,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 30,
    backgroundColor: 'black',
  },

  trackInfo: {
    alignItems: 'flex-start',
    width: '88%',
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 5,
    color: 'black',
  },

  artist: {
    fontSize: 16,
    color: 'gray',
  },

  progressBar: {
    width: '80%',
    marginBottom: 30,
  },

  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  controlBtn: {
    marginHorizontal: 20,
  },

  primaryControlIcon: {
    width: 45,
    height: 45,
  },

  secondaryControlIcon: {
    width: 30,
    height: 35,
  },

  extraControlIcon: {
    width: 30,
    height: 30,
  },

  loopContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },

  loopIndicator: {
    width: 3,
    height: 3,
    borderRadius: 4,
    backgroundColor: '#E9A941',
    alignSelf: 'center',
  },
});
