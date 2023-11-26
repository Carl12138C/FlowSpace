import { useRef, useState } from "react";
import { getUserContext } from "../context/AuthContext";
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
import { Box, Button, Modal, Stack, TextField } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
};

export default function ChatPage() {
    const { userData, streamChat } = getUserContext();
    const [sort, setSort] = useState({ last_message_at: -1 });
    const [filter, setFiler] = useState({
        type: "messaging",
        members: { $in: [userData.username] },
    });

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

function Channels({ loadedChannels }) {
    const { channel: activeChannel, setActiveChannel } = useChatContext();
    const { userData, streamChat } = getUserContext();

    const [open, setOpen] = useState(false);
    const memberRef = useRef();
    const groupNameRef = useRef();

    async function createChannel() {
        const channel = await streamChat.channel("messaging", {members: [userData.username, memberRef.current.value], name: groupNameRef.current.value});
        await channel.create();
        setOpen(false);
    }

    return (
        <div className="channelList">
            <div id="modal">
                <button
                    className="channelList-button"
                    onClick={() => {
                        setOpen(true);
                        console.log("creating channel");
                    }}
                >
                    New Conversation
                </button>
                <Modal
                    open={open}
                    onClose={() => {
                        setOpen(false);
                    }}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{ ...style }}>
                        <h2 id="child-modal-title">Create New Group Chat</h2>
                        <Stack sx={{alignItems: "center"}} spacing={2}>
                            <TextField sx={{minWidth: 500}} label="Group Chat Name" inputRef={groupNameRef}/>
                            <TextField sx={{minWidth: 500}} label="Members" inputRef={memberRef}/>
                            <Button
                                onClick={function () {
                                    createChannel()
                                }}
                            >
                                Create Group Chat
                            </Button>
                        </Stack>
                    </Box>
                </Modal>
            </div>
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
