import React from 'react';
import {AuthContextProvider} from '../_utils/auth-context';
import Main from '../Main';
import {ActiveTrackProvider} from '../_utils/queue-context';

const MainLayout = () => {
  return (
    <AuthContextProvider>
      <ActiveTrackProvider>
        <Main />
      </ActiveTrackProvider>
    </AuthContextProvider>
  );
};

export default MainLayout;
