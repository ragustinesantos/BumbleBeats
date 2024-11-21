/* eslint-disable react/no-unstable-nested-components */
import 'react-native-gesture-handler';
import '../gesture-handler';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Login from './screens/Login';
import DrawerNav from './navigation/DrawerNav';
import TabNav from './navigation/TabNav';

function Main(): React.JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return !isLoggedIn ? (
    <Login handleLogin={handleLogin} />
  ) : (
    <NavigationContainer>
      <TabNav />
    </NavigationContainer>
  );
}

export default Main;
