import React from 'react';
import { createContext } from 'react';
import {createUserWithEmailAndPassword, deleteUser, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import app from '../../firebase/firebase.config'
import { useState } from 'react';
import { useEffect } from 'react';

const googleAuthProvider = new GoogleAuthProvider();

export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading] = useState(true); 
    const createAccount = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const updateUserInfo =(userInfo)=>{
        setLoading(true)
         return updateProfile(auth.currentUser,userInfo)
    }
    const logIn = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut =()=>{
        setLoading(true);
       return signOut(auth);
    }

    // const removeUser =()=>{
    //     return deleteUser(auth.seleselectedUserctedUser);
    // }
    const googleSignIn = ()=>{
        setLoading(true);
        return signInWithPopup(auth,googleAuthProvider);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            setLoading(false)
        })
        return ()=>unsubscribe();
    },[])
    const authInfo ={
        loading,
        user,
        createAccount,
        updateUserInfo,
        logIn,
        logOut,
        googleSignIn
        
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;