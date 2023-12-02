import { ChannelHeader, MessageInput, MessageList, Thread, Window, useChannelActionContext } from "stream-chat-react";


function ChannelInner() {
    const { sendMessage } = useChannelActionContext();

    function overrideSubmitHandler(userInput) {

        const message = {
            text: userInput.text,
            attachments: userInput.attachments,
            mentioned_users: userInput.mentioned_users,
        };

        sendMessage(message);
    }

    return (
        <>
            <Window>
                <ChannelHeader />
                <MessageList hideDeletedMessages />
                <MessageInput
                    focus
                    overrideSubmitHandler={overrideSubmitHandler}
                />
            </Window>
            <Thread />
        </>
    );
}

export default ChannelInner;