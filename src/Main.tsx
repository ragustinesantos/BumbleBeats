/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
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
      <DrawerNav />
    </NavigationContainer>
  );
}

export default Main;
