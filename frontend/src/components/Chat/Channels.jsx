import { useChatContext } from "stream-chat-react";
import AddFriendModal from "./AddFriendModal";
import { useState } from "react";
import { Box, Button, IconButton, Modal, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import NewGroupModal from "./NewGroupModal";
import { getUserContext } from "../../context/AuthContext";

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
    const { userData } = getUserContext();

    const [modalDisplay, setModalDisplay] = useState({
        friendOption: false,
        groupOption: false,
    });
    const [confirmModal, setConfirmModal] = useState(false);

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
                <AddFriendModal
                    modalDisplay={modalDisplay}
                    setModalDisplay={setModalDisplay}
                />
                <NewGroupModal
                    modalDisplay={modalDisplay}
                    setModalDisplay={setModalDisplay}
                />
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
                                                  {channel.data?.name[userData.username]
                                                      ? (channel.data?.name[userData.username]).charAt(0)
                                                      : channel.data?.name.charAt(0)}
                                              </p>
                                          </div>
                                      )}
                                      <div className="channelList-channel-name">
                                          {(channel.data?.name[userData.username]
                                                      ? channel.data?.name[userData.username]
                                                      : channel.data?.name) || "Channel"}
                                      </div>
                                  </div>
                                  {/* <Tooltip
                                      title="Remove Conversation"
                                      placement="right"
                                      arrow
                                      className="channel-remove"
                                  >
                                      <IconButton
                                          onClick={() => {
                                              setConfirmModal(true);
                                              console.log("removing channel");
                                          }}
                                      >
                                          <CloseIcon />
                                      </IconButton>
                                  </Tooltip>
                                  <Modal
                                      open={confirmModal}
                                      onClose={() => setConfirmModal(false)}
                                      aria-labelledby="modal-modal-title"
                                      aria-describedby="modal-modal-description"
                                  >
                                      <Box sx={{ ...style }}>
                                          Are you sure you want to remove this
                                          channel?
                                          <Button
                                              onClick={() => {
                                                  console.log("Idk");
                                                  setConfirmModal(false);
                                              }}
                                          >
                                              Confirm
                                          </Button>
                                          <Button
                                              onClick={() =>
                                                  setConfirmModal(false)
                                              }
                                          >
                                              Cancel
                                          </Button>
                                      </Box>
                                  </Modal> */}
                              </div>
                          );
                      })
                    : "No Conversations"}
            </div>
        </div>
    );
}
