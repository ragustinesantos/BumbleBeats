/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackNav from '../navigation/HomeStackNav';
import PlaylistStackNav from '../navigation/PlaylistStackNav';
import SearchStackNav from '../navigation/SearchStackNav';
import TabIcon from '../components/TabIcon';
import Playing from '../screens/Playing';
import SongModal from '../components/SongModal';
import {useActiveTrackContext} from '../_utils/queue-context';

const AppNav = createBottomTabNavigator();

export default function TabNav(): React.JSX.Element {
  const {activeTrack, isPlayingScreen} = useActiveTrackContext() || {};
  // const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <>
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
          tabBarStyle: {backgroundColor: '#222A2C', height: 70},
        })}
        initialRouteName="Home">
        <AppNav.Screen name="Home" component={HomeStackNav} />
        <AppNav.Screen name="Playlists" component={PlaylistStackNav} />
        <AppNav.Screen
          name="Playing"
          component={Playing}
          initialParams={{source: 'Tab'}}
        />
        <AppNav.Screen name="Search" component={SearchStackNav} />
      </AppNav.Navigator>
      {activeTrack && !isPlayingScreen ? <SongModal /> : null}
    </>
  );
}
