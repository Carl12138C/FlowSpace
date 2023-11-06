import * as React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import TaskItem from "../components/TaskItem";
import TaskInput from "../components/TaskInput";

const StyledDiv = styled("div")({
  // backgroundColor: 'aliceblue',
  marginLeft: 20,
  width: 1000,
  borderRadius: 4,
});

export default function Tasklist() {
  const [itemList, setItems] = React.useState([
    {id: 1, title: "Get Coffee", completed: false },
    {id: 2, title: "Team Meeting", completed: false },
    {id: 3, title: "Presentation", completed: false },
    {id: 4, title: "Lunch", completed: false },
  ])

  const addTask = (newTitle) => {
    const newTask = {title: newTitle, completed: false };
    setItems( [...itemList, newTask] );
  };

  function generateTaskItem (itemProps) {
    return (
    <TaskItem
      key={itemProps.id}
      info={itemProps}
    />
    )}

  return (
    <StyledDiv>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid xs={9}>
            <Typography variant="h4" gutterBottom>
              My Tasks
            </Typography>
          </Grid>
          <Grid xs={3}>
            <TaskInput addTask= {addTask} />
          </Grid>
          <Grid xs={12}>
            <Stack spacing={2}>
              { itemList.map(generateTaskItem) }
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </StyledDiv>
  );
}
