import { useEffect, useState } from "react";
import { getUserContext } from "../context/AuthContext";
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

const apiKey = import.meta.env.VITE_STREAM_KEY;

// temp rand user
const userData = {email: "liukevin.nyc@gmail.com", password: "abc123456", uid: "q3rapw6AApPGN5q5rfWLXpycneA3"}

// client
export default function ChatPage() {
    // const {userData} = getUserContext();
    const [client, setClient] = useState();
    const [sort, setSort] = useState({ last_message_at: -1 });
    const [filter, setFiler] = useState({
        type: "messaging",
        members: { $in: [userData.uid] },
    });

    useEffect(function connect() {
        console.log(userData);
        async function init() {
            const chatClient = new StreamChat.getInstance(apiKey);

            let isInterupted = false;
            const connection = chatClient.connectUser({id:userData.uid, name:userData.email}, chatClient.devToken(userData.uid)).then(() => {
                if(isInterupted) return;
                setClient(chatClient);
            });

            //Create Channel
            // const chatChannel = chatClient.channel(
            //     "messaging",
            //     "test-channel3",
            //     {
            //         name: "Personal Channel",
            //         members: [userData.uid],
            //     }
            // );
            // await chatChannel.watch();

        }
        init();

        return function cleanUp() {
            if (client) {
                client.disconnectUser();
            }
        };
    }, []);

    if (!client) return <LoadingIndicator />;

    return (
        <Chat client={client} theme="messaging light">
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

    // console.log(activeChannel);
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
                <MessageList hideDeletedMessages/>
                <MessageInput
                    focus
                    overrideSubmitHandler={overrideSubmitHandler}
                />
            </Window>
            <Thread />
        </>
    );
}
