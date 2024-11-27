import React, { ReactNode } from 'react';
import { AuthContextProvider } from '../utils/auth-context';


const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    );
};

export default MainLayout;