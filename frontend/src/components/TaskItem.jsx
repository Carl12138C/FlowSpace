import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTask from "../components/EditTask";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

// const handleChange = (event) => {

// };

export default function TaskItem({ info, updateTask, removeTask}) {
  const [isDone, setIsDone] = useState(info.isDone);
  const [localIsDone, setLocalIsDone] = useState(info.isDone);
  const [userTask,setUserTask] = useState(info)

  function editTask(newTask){
    setUserTask(newTask);
    info.deadline = newTask.deadline;
    info.description = newTask.description;
    info.isDone = newTask.isDone;
    info.title = newTask.title;
    updateTask();
  }
  return (
    <>
      <Item>
        <Grid container spacing={2} data-cy="item-task">
          <Grid item xs={10}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isDone}
                />
              }
              label={info.title}
            />
          </Grid>
          <Grid item xs={2}>
            <Grid container justifyContent="flex-end">
              <EditTask
                taskInfo={info}
                setisDone={setIsDone}
                localIsDone={localIsDone}
                setLocalIsDone={setLocalIsDone}
                editTask = {editTask}
              />
              <IconButton data-cy="button-remove-task" onClick={() => {removeTask(info)}}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Item>
    </>
  );
}
