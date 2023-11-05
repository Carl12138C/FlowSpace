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
            <TaskInput />
          </Grid>
          <Grid xs={12}>
            <Stack spacing={2}>
              <TaskItem />
              <TaskItem />
              <TaskItem />
              <TaskItem />
              <TaskItem />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </StyledDiv>
  );
}
