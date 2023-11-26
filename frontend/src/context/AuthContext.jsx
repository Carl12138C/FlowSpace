import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { StreamChat } from "stream-chat";

const UserContext = createContext(null);

export function AuthContext({ children }) {
    const [userData, setUserData] = useState();
    const [streamChat, setStreamChat] = useState();

    useEffect(() => {
        if (userData == null) {
            return;
        }
        const chat = new StreamChat.getInstance(
            import.meta.env.VITE_STREAM_KEY
        );

        if (
            userData.streamToken == chat.tokenManager.token &&
            userData.username == chat.user.id
        ) {
            return;
        }

        let isInterrupted = false;

        const connection = chat
            .connectUser({id: userData.username}, userData.streamToken)
            .then(() => {
                if (isInterrupted) {
                    return;
                }
                setStreamChat(chat);
            });

        return () => {
            isInterrupted = true;
            setStreamChat(undefined);
            connection.then(() => {
                chat.disconnect();
            });
        };
    }, [userData]);

    return (
        <UserContext.Provider value={{ userData, setUserData, streamChat }}>
            {children}
        </UserContext.Provider>
    );
}

export function getUserContext() {
    return useContext(UserContext);
}
