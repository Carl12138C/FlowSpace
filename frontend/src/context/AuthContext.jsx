import React from "react";
import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function AuthContext({ children }) {
    const [userData, setUserData] = useState("something");

    return(
        <UserContext.Provider value={{userData, setUserData}}>
            {children}
        </UserContext.Provider>
    );
}

export function getUserContext() {
    return useContext(UserContext);
}