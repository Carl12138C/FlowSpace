import {
    Box,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
} from "@mui/material";
import { useEffect, useState } from "react";

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

export default function SelectFriends({ selectedFriends, setSelectedFriends }) {
    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
        var isInterrupted = false;
        console.log("calling firebase");
        if (isInterrupted) return;
        setFriendList(["Friend 1", "Friend 2", "Friend 3"]);

        return () => {
            isInterrupted = true;
        };
    }, []);

    function handleChange(e) {
        setSelectedFriends(e.target.value);
    }

    return (
        <FormControl sx={{ m: 1, width: 450 }}>
            <InputLabel>Friends</InputLabel>
            <Select
                multiple
                value={selectedFriends}
                onChange={handleChange}
                input={<OutlinedInput label="Friends" />}
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
                {friendList.length > 0 ? (
                    friendList.map((friend) => (
                        <MenuItem key={friend} value={friend}>
                            {friend}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>
                        <i>No Friends</i>
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    );
}
