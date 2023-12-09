import * as React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import TaskItem from "../components/TaskItem";
import TaskInput from "../components/TaskInput";
import { getUserContext } from "../context/AuthContext";
import { createUserTask, getUserTask, getTasks } from "../FirebaseUtil";

const StyledDiv = styled("div")({
    // backgroundColor: 'aliceblue',
    marginLeft: 20,
    width: 1000,
    borderRadius: 4,
});

export default function Tasklist() {

    const { userData } = getUserContext();
    const uid = userData.uid;
    const [itemList, setItems] = React.useState([]);

    React.useEffect(() => {
      const fetchTasks = async () => {
        const tasks = await getTasks(uid);
        setItems(Object.values(tasks.data));
      }
      fetchTasks()
    },[]);

    const addTask = async (taskInfo) => {
        const newTask = {
            id: taskInfo.id,
            title: taskInfo.title,
            completed: false,
        };
        setItems([...itemList, newTask]);
        await createUserTask(uid, newTask);
    };

    const editTask = (taskInfo) => {
        const newTask = { id: taskInfo.id, title: taskInfo.title };
        setItems((prev) =>
            prev.map((anItem) => (anItem.id === taskInfo.id ? newTask : anItem))
        );
    };

    const removeTask = (taskId) => {
        const newList = [...itemList].filter((anItem) => anItem.id !== taskId);
        setItems(newList);
    };


    function generateTaskItem(itemProps) {
        return (
            <TaskItem
                key={itemProps.id}
                info={itemProps}
                editTask={editTask}
                removeTask={removeTask}
            />
        );
    }

    return (
        <StyledDiv>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={9}>
                        <Typography variant="h4" gutterBottom>
                            My Tasks
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <TaskInput addTask={addTask} />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={2}>
                            {itemList.map(generateTaskItem)}
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </StyledDiv>
    );
}
