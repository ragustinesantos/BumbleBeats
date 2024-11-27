import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TrackPlayer, { RepeatMode } from 'react-native-track-player';
import Login from './screens/Login';
import DrawerNav from './navigation/DrawerNav';
import MainLayout from './layouts/MainLayout';

function Main(): React.JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  const handleLogin = (user: string) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    setUsername('');
    setIsLoggedIn(false);
  };

  // On load, set up player
  useEffect(() => {
    const playerSetup = async () => {
      if (!isInitialized) {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.setRepeatMode(RepeatMode.Off);
        setIsInitialized(true);
      }
    };
    playerSetup();
  }, [isInitialized]);

  return (
    <MainLayout>
      {!isLoggedIn ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <NavigationContainer>
          <DrawerNav
            username={username}
            logout={handleLogout}
          />
        </NavigationContainer>
      )}
    </MainLayout>
  );
}

export default Main;
