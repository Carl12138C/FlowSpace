import { useRef, useState } from "react";
import { getUserContext } from "../../context/AuthContext";
import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import SelectFriends from "./SelectFriends";

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

export default function NewGroupModal({ modalDisplay, setModalDisplay }) {
    const { userData, streamChat } = getUserContext();
    const [selectedFriends, setSelectedFriends] = useState([]);
    const groupNameRef = useRef("");

    async function createGroupChat() {
        const channel = await streamChat.channel("messaging", {
            members: [userData.username].concat(selectedFriends),
            name: groupNameRef.current.value,
        });
        await channel.create();
        
        setSelectedFriends([]);
        setModalDisplay({
            friendOption: false,
            groupOption: false,
        });
    }

    return (
        <Modal
            open={modalDisplay.groupOption}
            onClose={() => {
                setModalDisplay({
                    friendOption: false,
                    groupOption: false,
                });
            }}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={{ ...style }}>
                <h2 id="child-modal-title">New Group Chat</h2>
                <Stack sx={{ alignItems: "center" }} spacing={2}>
                    <TextField
                        sx={{ minWidth: 450 }}
                        label="Group Chat Name"
                        inputRef={groupNameRef}
                    />
                    <SelectFriends
                        selectedFriends={selectedFriends}
                        setSelectedFriends={setSelectedFriends}
                    />
                    <Button
                        disabled={selectedFriends.length <= 1}
                        onClick={createGroupChat}
                    >
                        Create Group Chat
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}
