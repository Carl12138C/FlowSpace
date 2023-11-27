import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
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

export default function TaskItem({ info, editTask, removeTask }) {
  return (
    <>
      <Item>
        <Grid container spacing={2}>
          <Grid item xs="10">
            <FormControlLabel control={<Checkbox />} label={info.title} />
          </Grid>
          <Grid item xs="2">
            <Grid container justifyContent="flex-end">
              <EditTask taskInfo={info} editTask={editTask}/>
              <IconButton onClick={() => removeTask(info.id)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Item>
    </>
  );
}
