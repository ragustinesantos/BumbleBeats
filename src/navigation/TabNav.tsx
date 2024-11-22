/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackNav from '../navigation/HomeStackNav';
import PlaylistStackNav from '../navigation/PlaylistStackNav';
import SearchStackNav from '../navigation/SearchStackNav';
import TabIcon from '../components/TabIcon';
import PlayingStackNav from './PlayingStackNav';

const AppNav = createBottomTabNavigator();

export default function TabNav(): React.JSX.Element {
  return (
    <AppNav.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({
          focused,
          color,
          size,
        }: {
          focused: boolean;
          color: string;
          size: number;
        }) => {
          return (
            <TabIcon
              route={route.name}
              focused={focused}
              color={color}
              size={size}
            />
          );
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: '#222A2C'},
      })}
      initialRouteName="Home">
      <AppNav.Screen name="Home" component={HomeStackNav} />
      <AppNav.Screen name="Playlists" component={PlaylistStackNav} />
      <AppNav.Screen name="Playing" component={PlayingStackNav} />
      <AppNav.Screen name="Search" component={SearchStackNav} />
    </AppNav.Navigator>
  );
}
