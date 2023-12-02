import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import { getUserContext } from "../../context/AuthContext";
import { useState } from "react";
import { addFriend } from "../../FirebaseUtil";

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

export default function AddFriendModal({ modalDisplay, setModalDisplay }) {
    const { userData, streamChat } = getUserContext();
    const [friendToAdd, setFriendToAdd] = useState("");

    async function createNewFriend() {
        addFriend(userData.uid, friendToAdd).then((response) => {
            if (response.ok) {
                streamChat
                    .channel("messaging", {
                        members: [userData.username, friendToAdd],
                        name: friendToAdd,
                    })
                    .then((channel) => {
                        channel.create().then((channelResponse) => {
                            console.log(streamResponse);
                        });
                    });
                setModalDisplay({
                    friendOption: false,
                    groupOption: false,
                });
            } else {
                console.log(response.text());
            }
        });
    }

    return (
        <Modal
            open={modalDisplay.friendOption}
            onClose={() => {
                setModalDisplay({
                    friendOption: false,
                    groupOption: false,
                });
                setFriendToAdd("");
            }}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={{ ...style }}>
                <h2 id="child-modal-title">New Conversation</h2>
                <Stack sx={{ alignItems: "center" }} spacing={2}>
                    <TextField
                        sx={{ minWidth: 450 }}
                        label="Add Friend"
                        onChange={(e) => setFriendToAdd(e.target.value)}
                    />
                    <Button
                        disabled={friendToAdd === ""}
                        onClick={() => {
                            createNewFriend();
                            setFriendToAdd("");
                        }}
                    >
                        Add Friend
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}
