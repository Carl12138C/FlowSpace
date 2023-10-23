import React, { useEffect, useState } from "react";

import Message from "./Message";

const data = [
    {
        user: "Name1",
        message: "123",
        id:"0"
    },
    {
        user: "Name2",
        message: "abc",
        id:"1"
    },
    {
        user: "Name3",
        message: "kjdshf",
        id:"2"
    },
    {
        user: "Name4",
        message: "Test",
        id:"3"
    },
    {
        user: "Name5",
        message: "Temp",
        id:"4"
    },
    {
        user: "Name6",
        message: "Yay",
        id:"5"
    },
];

function ChatLog() {

    const {chatLogs, setChatLogs} = useState([]);
    // useEffect()

    return (
        <>
            {data.map(function (element) {
                return (
                    <Message
                        username={element.user}
                        message={element.message}
                        key={element.id}
                    />
                );
            })}
        </>
    );
};

export default ChatLog;
