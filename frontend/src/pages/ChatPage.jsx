import { useState } from "react";
import { getUserContext } from "../context/AuthContext";
import {
    Channel,
    ChannelList,
    Chat,
    LoadingIndicator,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import "../css/chat.css";
import ChannelInner from "../components/Chat/ChannelInner";
import Channels from "../components/Chat/Channels";

export default function ChatPage() {
    const { userData, streamChat } = getUserContext();
    const sort = { last_message_at: -1 };
    const filter = {
        type: "messaging",
        members: { $in: [userData.username] },
    };

    if (!streamChat) return <LoadingIndicator />;

    return (
        <Chat client={streamChat} theme="messaging light">
            <ChannelList
                List={Channels}
                sendChannelsToList
                filters={filter}
                sort={sort}
            />
            <Channel>
                <ChannelInner />
            </Channel>
        </Chat>
    );
}
