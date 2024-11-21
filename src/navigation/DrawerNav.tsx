/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Settings from '../screens/Settings';
import Profile from '../screens/Profile';
import TabNav from './TabNav';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function DrawerNav({
  username,
}: {
  username: string;
}): React.JSX.Element {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#F2F2F2',
        headerStyle: {backgroundColor: '#222A2C', height: 56},
        headerTitleStyle: {fontSize: 20},
        drawerStyle: {backgroundColor: '#222A2C'},
        drawerInactiveTintColor: '#F2F2F2',
        drawerActiveTintColor: '#E9A941',
        drawerActiveBackgroundColor: 'transparent',
        drawerLabelStyle: {fontSize: 16},
      }}
      drawerContent={props => (
        <CustomDrawerContent {...props} username={username} />
      )}>
      <Drawer.Screen
        name="APP"
        component={TabNav}
        options={{headerShown: false}}
      />
      <Drawer.Screen name="SETTINGS" component={Settings} />
      <Drawer.Screen name="PROFILE" component={Profile} />
    </Drawer.Navigator>
  );
}
