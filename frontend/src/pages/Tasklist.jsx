import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TaskItem from '../components/TaskItem';

const StyledDiv = styled('div')({
  backgroundColor: 'aliceblue',
  marginLeft: 20,
  width: 100,
  borderRadius: 4,
});

export default function Tasklist() {    
    return (
      <StyledDiv>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
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