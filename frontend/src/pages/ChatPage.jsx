import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
    Channel,
    ChannelList,
    ChannelHeader,
    Chat,
    MessageInput,
    MessageList,
    Thread,
    Window,
    LoadingIndicator,
    useChatContext,
    useChannelActionContext,
} from "stream-chat-react";

import "stream-chat-react/dist/css/v2/index.css";
import "../css/chat.css";

//Store in env later
const apiKey = import.meta.env.VITE_STREAM_KEY;

const user = {
    id: "KevinTest",
    name: "Kevin Test",
};


export default function ChatPage() {
    const [cilent, setCilent] = useState();
    const [sort, setSort] = useState({ last_message_at: -1 });
    const [filter, setFiler] = useState({
        type: "messaging",
        members: { $in: [user.id] },
    });

    useEffect(function connect() {
        async function init() {
            const chatCilent = new StreamChat.getInstance(apiKey);

            await chatCilent.connectUser(user, chatCilent.devToken(user.id));

            const chatChannel = chatCilent.channel(
                "messaging",
                "test-channel",
                {
                    name: "Channel for Testing Purposes",
                    members: [user.id],
                }
            );

            await chatChannel.watch();

            setCilent(chatCilent);
        }
        init();

        return function cleanUp() {
            if (cilent) {
                cilent.disconnectUser();
            }
        };
    }, []);

    if (!cilent) return <LoadingIndicator />;

    return (
        <Chat client={cilent} theme="messaging light">
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

function Channels({ loadedChannels }) {
    const { channel: activeChannel, setActiveChannel } = useChatContext();

    return (
        <div className="channelList">
            <button
                className="channelList-button"
                onClick={() => {
                    console.log("creating channel");
                }}
            >
                New Conversation
            </button>
            <div className="channelList-container">
                {loadedChannels != null && loadedChannels.length > 0
                    ? loadedChannels.map((channel) => {
                          const isActive = channel === activeChannel;
                          const extraClass = isActive
                              ? "channel-active"
                              : "channel-notActive";
                          return (
                              <button
                                  onClick={() => {
                                      setActiveChannel(channel);
                                  }}
                                  disabled={isActive}
                                  className={`channelList-channel ${extraClass}`}
                                  key={channel.id}
                              >
                                  {channel.data?.image != null ? (
                                      <img
                                          className="channelList-channel_image"
                                          src={channel.data.image}
                                      />
                                  ) : (
                                      <div className="channelList-default_image">
                                          {channel.data?.name.charAt(0)}
                                      </div>
                                  )}
                                  <div className="channelList-channel-name">
                                      {channel.data?.name || "Channel"}
                                  </div>
                              </button>
                          );
                      })
                    : "No Conversations"}
            </div>
        </div>
    );
}

function ChannelInner() {
    const { sendMessage } = useChannelActionContext();

    function overrideSubmitHandler(userInput) {
        console.log(`Sending Message:\n ${userInput.text} \n to Backend DB`);

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
                <MessageList />
                <MessageInput
                    focus
                    overrideSubmitHandler={overrideSubmitHandler}
                />
            </Window>
            <Thread />
        </>
    );
}
