import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Playing from '../screens/Playing';

const PlayingStack = createNativeStackNavigator();

export default function PlayingStackNav(): React.JSX.Element {
  return (
    <PlayingStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#F2F2F2',
        headerStyle: {backgroundColor: '#222A2C'},
      }}
      initialRouteName="PLAYING">
      <PlayingStack.Screen name="PLAYING" component={Playing} />
    </PlayingStack.Navigator>
  );
}
