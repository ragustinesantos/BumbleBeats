import React from 'react';
import {AuthContextProvider} from '../_utils/auth-context';
import Main from '../Main';

const MainLayout = () => {
  return (
    <AuthContextProvider>
      <Main />
    </AuthContextProvider>
  );
};

export default MainLayout;
