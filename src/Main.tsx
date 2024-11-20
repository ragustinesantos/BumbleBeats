/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import TrackPlayer, {useProgress, RepeatMode} from 'react-native-track-player';
import {defaultTrack, TrackObject} from './utils/utility';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import TestScreen from './screens/TestScreen';

const AppNav = createBottomTabNavigator();

function Main(): React.JSX.Element {
  return <TestScreen />;
}

export default Main;
