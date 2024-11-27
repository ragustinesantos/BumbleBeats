"use client";

import { useContext, createContext, useState, useEffect, ReactNode } from "react";
import {
    signOut,
    onAuthStateChanged,
    User,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

interface AuthContextType {
    user: User | null;
    createUserWithEmail: (email: string, password: string) => Promise<boolean>;
    signInWithEmail: (email: string, password: string, err: (hasError: boolean) => void) => Promise<boolean>;
    firebaseSignOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
    children,
}: {
    children: ReactNode

}) => {
    const [user, setUser] = useState<User | null>(null);

    const createUserWithEmail = async (email: string, password: string): Promise<boolean> => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                return true;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                return false;
            });
        return false;
    }


    const signInWithEmail = async (email: string, password: string, err: (hasError: boolean) => void): Promise<boolean> => {
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                setUser(userCredential.user);
                err(false);
                return true;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                err(true);
                return false;
            });
        return false;
    };

    const firebaseSignOut = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [user]);

    return (
        <AuthContext.Provider
            value={{
                user,
                createUserWithEmail,
                signInWithEmail,
                firebaseSignOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useUserAuth = () => {
    return useContext(AuthContext);
};