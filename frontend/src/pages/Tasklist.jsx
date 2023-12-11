import { useState, useEffect, useRef } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import TaskItem from "../components/TaskItem";
import TaskInput from "../components/TaskInput";
import { getUserContext } from "../context/AuthContext";
import { updateUserTask, getUserTask } from "../FirebaseUtil";
const StyledDiv = styled("div")({
  // backgroundColor: 'aliceblue',
  marginLeft: 20,
  width: "100%",
  borderRadius: 4,
});

export default function Tasklist() {
  const taskRef = getUserContext().userData;
  const uid = getUserContext().userData.uid;
  const firstUpdate = useRef(import.meta.env.DEV ? 0 : true);
  const [userTask, setUserTask] = useState(
    getUserContext().userData.userTask?.data ?? []
  );

  useEffect(() => {
    updateTask();
  }, [userTask]);

  async function updateTask() {
    await updateUserTask(uid, userTask ?? []);
    const updatedData = await getUserTask(uid);
    // console.log(updatedData);
    taskRef.userTask = updatedData;
  }

  function addTask(taskInfo) {
    const newTask = {
      deadline: taskInfo.deadline,
      description: taskInfo.description,
      isDone: taskInfo.isDone,
      title: taskInfo.title,
    };
    setUserTask([...userTask, newTask]);
  }

  function removeTask(index) {
    var result = [...userTask];
    result.splice(index,1);
    setUserTask(result);
  }

  function generateTaskItem(itemProps, index) {
    return (
      <TaskItem
        key={"" + index}
        info={itemProps}
        updateTask={updateTask}
        removeTask={removeTask}
        index={index}
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
              {userTask?.map((task, index) => generateTaskItem(task, index))}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </StyledDiv>
  );
}
