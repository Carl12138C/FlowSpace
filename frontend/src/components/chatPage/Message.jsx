import React, { useState } from "react";

function Message({message, username}) {

    return(
        <>
            <p>
                Username: {username}
            </p>
            <p>
                Message: {message}
            </p>
        </>
    );
};

export default Message;