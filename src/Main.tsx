import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TrackPlayer, { RepeatMode } from 'react-native-track-player';
import Login from './screens/Login';
import DrawerNav from './navigation/DrawerNav';
import { useUserAuth } from './_utils/auth-context';

function Main(): React.JSX.Element {
  const [drawerUsername, setDrawerUsername] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  const { user, signInWithEmail, firebaseSignOut } = useUserAuth() || {};

  const handleLogin = async (username: string, pass: string, err: (hasError: boolean) => void) => {

    if (signInWithEmail) {
      try {
        await signInWithEmail(username, pass, err);
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDrawerUsername = (inputTxt: string) => {
    setDrawerUsername(inputTxt);
  };

  const handleLogout = async () => {
    if (firebaseSignOut) {
      await firebaseSignOut();
    }
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
    !user ? (
      <Login handleLogin={handleLogin} handleDrawerUsername={handleDrawerUsername}/>
    ) : (
      <NavigationContainer>
        <DrawerNav
          username={drawerUsername}
          logout={handleLogout}
        />
      </NavigationContainer>
    )
  );
}

export default Main;
