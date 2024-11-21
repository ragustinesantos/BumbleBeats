import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Settings from '../screens/Settings';
import Profile from '../screens/Profile';
import TabNav from './TabNav';

const Drawer = createDrawerNavigator();

export default function DrawerNav(): React.JSX.Element {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="TabNav"
        component={TabNav}
        options={{headerShown: false}}
      />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}
