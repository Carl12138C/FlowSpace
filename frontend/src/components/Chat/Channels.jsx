import { useChatContext } from "stream-chat-react";
import { getUserContext } from "../../context/AuthContext";
import SelectFriends from "./SelectFriends";
import { useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    IconButton,
    Modal,
    Stack,
    TextField,
    Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";

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

export default function Channels({ loadedChannels }) {
    const { channel: activeChannel, setActiveChannel } = useChatContext();
    const { userData, streamChat } = getUserContext();

    const [modalDisplay, setModalDisplay] = useState({
        modal: false,
        friendOption: false,
        groupOption: false,
    });
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [confirmModal, setConfirmModal] = useState(false);
    const memberRef = useRef("");
    const groupNameRef = useRef("");

    async function createChannel() {
        if (modalDisplay.groupOption) {
            // const channel = await streamChat.channel("messaging", {
            //     members: [userData.username].concat(selectedFriends),
            //     name: groupNameRef.current.value,
            // });
            // await channel.create();
            console.log([userData.username].concat(selectedFriends));
        }

        if (modalDisplay.friendOption) {
            // const channel = await streamChat.channel("messaging", {
            //     members: [userData.username, memberRef.current.value],
            //     name: memberRef.current.value,
            // });
            // await channel.create();
            console.log([userData.username, memberRef.current.value]);
        }
        setModalDisplay({
            modal: false,
            friendOption: false,
            groupOption: false,
        });
        setSelectedFriends([]);
    }

    return (
        <div className="channelList">
            <div id="modal">
                <div className="channelList-header">
                    <p>CONVERSATIONS</p>
                    <div className="flex">
                        <Tooltip
                            title="New Conversation"
                            placement="bottom"
                            arrow
                        >
                            <IconButton
                                onClick={() => {
                                    setModalDisplay({
                                        modal: true,
                                        friendOption: true,
                                        groupOption: false,
                                    });
                                    console.log("creating channel");
                                }}
                            >
                                <PersonAddIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="New Group" placement="bottom" arrow>
                            <IconButton
                                onClick={() => {
                                    setModalDisplay({
                                        modal: true,
                                        friendOption: false,
                                        groupOption: true,
                                    });
                                    console.log("creating channel");
                                }}
                            >
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <Modal
                    open={modalDisplay.modal}
                    onClose={() => {
                        setModalDisplay({
                            modal: false,
                            friendOption: false,
                            groupOption: false,
                        });
                    }}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{ ...style }}>
                        {modalDisplay.friendOption ? (
                            <h2 id="child-modal-title">New Conversation</h2>
                        ) : (
                            <h2 id="child-modal-title">New Group Chat</h2>
                        )}
                        <Stack sx={{ alignItems: "center" }} spacing={2}>
                            {modalDisplay.groupOption && (
                                <TextField
                                    sx={{ minWidth: 450 }}
                                    label="Group Chat Name"
                                    inputRef={groupNameRef}
                                />
                            )}
                            {modalDisplay.friendOption && (
                                <TextField
                                    sx={{ minWidth: 450 }}
                                    label="Add Friend"
                                    inputRef={memberRef}
                                />
                            )}
                            {modalDisplay.groupOption && (
                                <SelectFriends
                                    selectedFriends={selectedFriends}
                                    setSelectedFriends={setSelectedFriends}
                                />
                            )}
                            <Button
                                onClick={function () {
                                    createChannel();
                                }}
                            >
                                Done
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
                              <div
                                  onClick={() => {
                                      setActiveChannel(channel);
                                  }}
                                  disabled={isActive}
                                  className={`channelList-channel ${extraClass}`}
                                  key={channel.id}
                              >
                                  <div className="flex">
                                      {channel.data?.image != null ? (
                                          <img
                                              className="channelList-channel_image"
                                              src={channel.data.image}
                                          />
                                      ) : (
                                          <div className="channelList-default_image">
                                              <p id="default_image_letter">
                                                  {channel.data?.name.charAt(0)}
                                              </p>
                                          </div>
                                      )}
                                      <div className="channelList-channel-name">
                                          {channel.data?.name || "Channel"}
                                      </div>
                                  </div>
                                  {channel === activeChannel && (
                                      <Tooltip
                                          title="Remove Conversation"
                                          placement="right"
                                          arrow
                                      >
                                          <IconButton
                                              onClick={() => {
                                                  setConfirmModal(true);
                                                  console.log("removing channel");
                                              }}
                                          >
                                              <CloseIcon className="channel-remove" />
                                          </IconButton>
                                      </Tooltip>
                                  )}
                              </div>
                          );
                      })
                    : "No Conversations"}
            </div>
        </div>
    );
}
