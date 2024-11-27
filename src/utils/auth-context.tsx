'use client';

import {useContext, createContext, useState, useEffect, ReactNode} from 'react';
import {
  signOut,
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {auth} from './firebase';

interface AuthContextType {
  user: User | null;
  signInWithEmail: (email: string, password: string) => boolean;
  firebaseSignOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);

  const signInWithEmail = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log('logged in ' + user);
        return true;
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        return false;
      });
    return false;
  };

  const firebaseSignOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithEmail,
        firebaseSignOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(AuthContext);
};
