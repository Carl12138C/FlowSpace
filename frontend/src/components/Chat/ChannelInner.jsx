import {
    ChannelHeader,
    MessageInput,
    MessageList,
    Thread,
    Window,
} from "stream-chat-react";

function ChannelInner() {

    return (
        <>
            <Window>
                <ChannelHeader />
                <MessageList hideDeletedMessages />
                <MessageInput
                    focus
                />
            </Window>
            <Thread />
        </>
    );
}

export default ChannelInner;
