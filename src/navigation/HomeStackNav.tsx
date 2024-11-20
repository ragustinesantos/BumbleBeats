import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home';
import Playing from '../screens/Playing';

const HomeStack = createNativeStackNavigator();

export default function HomeStackNav(): React.JSX.Element {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#F2F2F2',
        headerStyle: {backgroundColor: '#222A2C'},
      }}>
      <HomeStack.Screen name="HOME" component={Home} />
      <HomeStack.Screen name="PLAYING" component={Playing} />
    </HomeStack.Navigator>
  );
}
