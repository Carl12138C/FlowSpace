import {
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Modal,
    Stack,
    TextField,
} from "@mui/material";
import { getUserContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { addFriend } from "../../FirebaseUtil";
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
    const [friendToAdd, setFriendToAdd] = useState("");

    function sendFriendRequest() {
        console.log("Sending Friend Request");
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
        console.log("Getting Friend Request");
        setFriendRequest([
            "Name1",
            "name2",
            "name3",
            "name4",
            "Name1",
            "name2",
            "name3",
            "name4",
        ]);
    }, []);

    async function acceptFriendRequest(index) {
        console.log("acceptFriendRequest" + friendRequest.at(index));

        // addFriend(userData.uid, friendToAdd).then(async (response) => {
        //     if (response.ok) {
        //         var name = {};
        //         name[userData.username] = friendToAdd;
        //         name[friendToAdd] = userData.username;

        //         const channel = streamChat.channel("messaging", {
        //             members: [userData.username, friendToAdd],
        //             name: name,
        //         });
        //         await channel.create();

        //         setModalDisplay({
        //             friendOption: false,
        //             groupOption: false,
        //         });
        //     } else {
        //         response.text().then((text) => {
        //             console.log(text);
        //         });
        //     }
        // });
    }

    return (
        <>
            <h3> Friend Requests</h3>
            <Box sx={{ overflow: "scroll", height: "250px" }}>
                <List>
                    {friendRequest.map((value, index) => {
                        return (
                            <ListItem
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={(e) => acceptFriendRequest(index)}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText primary={value} />
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </>
    );
}
