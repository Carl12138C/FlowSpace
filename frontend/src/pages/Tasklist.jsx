import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { styled } from "@mui/material/styles";
import TaskItem from "../components/TaskItem";

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
            <Button
              color="primary"
              aria-label="add to task list"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <AddIcon />
            </Button>
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
