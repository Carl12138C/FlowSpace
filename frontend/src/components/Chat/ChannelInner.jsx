import {
    Avatar,
    MessageInput,
    MessageList,
    Thread,
    Window,
    useChatContext,
} from "stream-chat-react";
import { getUserContext } from "../../context/AuthContext";

function ChannelInner() {
    return (
        <>
            <Window>
                <CustomChannelHeader />
                <MessageList hideDeletedMessages />
                <MessageInput focus />
            </Window>
            <Thread />
        </>
    );
}

const CustomChannelHeader = () => {
    const { channel } = useChatContext();
    const { userData } = getUserContext();

    return (
        <div>
            <div className="channelHeader">
                <Avatar
                    image={channel?.data?.image}
                    name={
                        (channel.data?.name[userData.username]
                            ? channel.data?.name[userData.username]
                            : channel.data?.name) || "Channel"
                    }
                    size={44}
                />
                <div className="channelHeader-details">
                    <div className="channelHeader-title">
                        {(channel.data?.name[userData.username]
                            ? channel.data?.name[userData.username]
                            : channel.data?.name) || "Channel"}
                    </div>
                    <div className="channelHeader-info">
                        {channel?.data?.member_count}{" "}
                        {channel?.data?.member_count === 1
                            ? "Member"
                            : "Members"}
                        {", " + channel?.state?.watcher_count + " Online"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChannelInner;
