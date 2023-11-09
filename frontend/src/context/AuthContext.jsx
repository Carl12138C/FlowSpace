import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { getAuth } from "firebase/auth"
import { initializeApp } from "firebase/app"

const UserContext = createContext(null);

const app = initializeApp({
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    databaseURL: import.meta.env.VITE_DATABASEURL,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APPID,
})

export function AuthContext({ children }) {
    const [userData, setUserData] = useState({id:"28734892"});
    const auth = getAuth(app);

    return(
        <UserContext.Provider value={{userData, setUserData, auth}}>
            {children}
        </UserContext.Provider>
    );
}

export function getUserContext() {
    return useContext(UserContext);
}