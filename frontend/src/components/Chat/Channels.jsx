import { useChatContext } from "stream-chat-react";
import { getUserContext } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    Chip,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    OutlinedInput,
    Select,
    Stack,
    TextField,
    Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function Channels({ loadedChannels }) {
    const { channel: activeChannel, setActiveChannel } = useChatContext();
    const { userData, streamChat } = getUserContext();

    const [open, setOpen] = useState(false);
    const memberRef = useRef("");
    const groupNameRef = useRef("");

    async function createChannel() {
        const channel = await streamChat.channel("messaging", {
            members: [userData.username, memberRef.current.value],
            name: groupNameRef.current.value,
        });
        await channel.create();
        setOpen(false);
    }

    return (
        <div className="channelList">
            <div id="modal">
                <div className="channelList-header">
                    <p>CONVERSATIONS</p>
                    <Tooltip title="New Conversation" placement="right" arrow>
                        <IconButton
                            onClick={() => {
                                setOpen(true);
                                console.log("creating channel");
                            }}
                        >
                            <AddIcon id="addIcon" />
                        </IconButton>
                    </Tooltip>
                </div>
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
                        <Stack sx={{ alignItems: "center" }} spacing={2}>
                            <TextField
                                sx={{ minWidth: 450 }}
                                label="Group Chat Name"
                                inputRef={groupNameRef}
                            />
                            <TextField
                                sx={{ minWidth: 450 }}
                                label="Member(s) to Add"
                                inputRef={memberRef}
                            />
                            <SelectFriends />
                            <Button
                                onClick={function () {
                                    createChannel();
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

                                  <Tooltip
                                      title="Remove Conversation"
                                      placement="right"
                                      arrow
                                  >
                                      <CloseIcon
                                          className="channel-remove"
                                          onClick={() => {
                                              console.log("removing channel");
                                          }}
                                      />
                                  </Tooltip>
                              </button>
                          );
                      })
                    : "No Conversations"}
            </div>
        </div>
    );
}

function SelectFriends() {
    console.log("I ran");
    const [friendList, setFriendList] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]);

    useEffect(() => {
        setFriendList([
            "Friend 1",
            "Friend 2",
            "Friend 3",
        ]);
    }, [])

    function handleChange(e) {
        setSelectedFriends(e.target.value);
    }

    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel>Friends</InputLabel>
            <Select
                multiple
                value={selectedFriends}
                onChange={handleChange}
                input={<OutlinedInput label="Chip" />}
                renderValue={(selected) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.5,
                        }}
                    >
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {friendList.map((friend) => (
                    <MenuItem key={friend} value={friend}>
                        {friend}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
