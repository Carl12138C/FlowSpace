import { useState, useEffect, useRef } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import TaskItem from "../components/TaskItem";
import TaskInput from "../components/TaskInput";
import { getUserContext } from "../context/AuthContext";
<<<<<<< HEAD

const StyledDiv = styled("div")({
    // backgroundColor: 'aliceblue',
    marginLeft: 20,
    width: 1000,
    borderRadius: 4,
});

export default function Tasklist() {
    const { userData } = getUserContext();
    const [itemList, setItems] = React.useState([
        { id: 1, title: "Get Coffee", completed: false },
        { id: 2, title: "Team Meeting", completed: false },
        { id: 3, title: "Presentation", completed: false },
        { id: 4, title: "Lunch", completed: false },
    ]);

    const addTask = (taskInfo) => {
        const newTask = {
            id: taskInfo.id,
            title: taskInfo.title,
            completed: false,
        };
        setItems([...itemList, newTask]);
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
=======
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
>>>>>>> a963207f9066cf1da7741daa4f1838daff73db94
}
