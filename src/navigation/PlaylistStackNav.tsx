import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PlaylistList from '../screens/PlaylistList';
import PlaylistAccessed from '../screens/PlaylistAccessed';
import Playing from '../screens/Playing';

const PlaylistStack = createNativeStackNavigator();

export default function PlaylistStackNav(): React.JSX.Element {
  return (
    <PlaylistStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#F2F2F2',
        headerStyle: {backgroundColor: '#222A2C'},
      }}>
      <PlaylistStack.Screen name="PLAYLISTS" component={PlaylistList} />
      <PlaylistStack.Screen name="PLAYLIST" component={PlaylistAccessed} />
      <PlaylistStack.Screen name="PLAYING" component={Playing} />
    </PlaylistStack.Navigator>
  );
}
