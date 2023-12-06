import {
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Modal,
    Stack,
    TextField,
} from "@mui/material";
import { getUserContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import {
    fbAcceptFriendRequest,
    fbGetFriendRequest,
    fbSendFriendRequest,
} from "../../FirebaseUtil";
import AddIcon from "@mui/icons-material/Add";

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
    const { userData } = getUserContext();
    const [friendToAdd, setFriendToAdd] = useState("");

    async function sendFriendRequest() {
        if (friendToAdd != userData.username) {
            const response = await fbSendFriendRequest(
                userData.uid,
                userData.username,
                friendToAdd
            );
            console.log(await response.text());
        }
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
        >
            <Box sx={{ ...style, height: "500px" }}>
                <h2>New Conversation</h2>
                <Stack sx={{ alignItems: "center" }} spacing={2}>
                    <TextField
                        sx={{ minWidth: 450 }}
                        label="Add Friend"
                        value={friendToAdd}
                        onChange={(e) => setFriendToAdd(e.target.value)}
                    />
                    <Button
                        disabled={friendToAdd === ""}
                        onClick={() => {
                            sendFriendRequest();
                            setFriendToAdd("");
                        }}
                    >
                        Add Friend
                    </Button>
                </Stack>
                <FriendRequestList setModalDisplay={setModalDisplay} />
            </Box>
        </Modal>
    );
}

function FriendRequestList({ setModalDisplay }) {
    const { userData, streamChat } = getUserContext();
    const [friendRequest, setFriendRequest] = useState([]);

    useEffect(() => {
        fbGetFriendRequest(userData.uid).then((response) => {
            setFriendRequest(response.data);
        });
    }, []);

    async function acceptRequest(uid) {

        const response = await fbAcceptFriendRequest(
            userData.uid,
            userData.username,
            uid,
            friendRequest[uid]
        );

        if (response.ok) {
            var name = {};
            name[userData.username] = friendRequest[uid];
            name[friendRequest[uid]] = userData.username;

            //So that the display channel name for two memeber group is
            //the other member's name
            const channel = streamChat.channel("messaging", {
                members: [userData.username, friendRequest[uid]],
                name: name,
            });
            await channel.create();

            setModalDisplay({
                friendOption: false,
                groupOption: false,
            });
        } else {
            console.log(await response.json())
        }
    }

    return (
        <>
            <h3> Friend Requests</h3>
            <Box sx={{ overflow: "scroll", height: "250px" }}>
                <List>
                    {friendRequest != null ? (
                        Object.keys(friendRequest).map((uid) => {
                            return (
                                <ListItem
                                    key={uid}
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={(e) => acceptRequest(uid)}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText
                                        primary={friendRequest[uid]}
                                    />
                                </ListItem>
                            );
                        })
                    ) : (
                        <MenuItem disabled>
                            <i>No Friend Request Yet</i>
                        </MenuItem>
                    )}
                </List>
            </Box>
        </>
    );
}
