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
    if (import.meta.env.DEV ? firstUpdate.current < 2 : firstUpdate.current) {
      import.meta.env.DEV
        ? (firstUpdate.current += 1)
        : (firstUpdate.current = false);
      return;
    }
    updateTask();
  }, [userTask]);

  async function updateTask() {
    await updateUserTask(uid, userTask ?? []);
    const updatedData = await getUserTask(uid);
    // console.log(updatedData);
    taskRef.userTask = updatedData;
  }
  console.log(userTask);

  async function addTask(taskInfo) {
    const newTask = {
      deadline: taskInfo.deadline,
      description: taskInfo.description,
      isDone: taskInfo.isDone,
      title: taskInfo.title,
    };
    setUserTask([...userTask, newTask]);
  }
  function isTarget(taskInfo, task) {
    return !(
      taskInfo.deadline == task.deadline &&
      taskInfo.description == task.description &&
      taskInfo.isDone == task.isDone &&
      taskInfo.title == task.title
    );
  }
  async function removeTask(taskInfo) {
    const result = userTask.filter((task)=> isTarget(taskInfo,task));
    setUserTask(result);
  };

  function generateTaskItem(itemProps) {
    return (
      <TaskItem
        key={itemProps.title}
        info={itemProps}
        updateTask={updateTask}
        removeTask = {removeTask}
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
            <Stack spacing={2}>{userTask?.map(generateTaskItem)}</Stack>
          </Grid>
        </Grid>
      </Box>
    </StyledDiv>
  );
}
