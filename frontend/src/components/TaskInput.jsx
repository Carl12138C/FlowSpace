import {useState}from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


export default function TaskInput({addTask}) {
  const [open, setOpen] = useState(false);
  const [deadline, setDeadline] = useState(dayjs().format("MM/DD/YYYY"));
  const [localIsDone, setLocalIsDone] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    addTask({
      deadline: deadline,
      description: data.get("task-des"),
      isDone: localIsDone,
      title: data.get("task-title"),
    });
    setLocalIsDone(false);
    setDeadline(dayjs().format("MM/DD/YYYY"));
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        color="primary"
        aria-label="add to task list"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        <AddIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={handleSubmit} sx={style}>
          <Stack spacing={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create A Task
            </Typography>
            <TextField
              fullWidth
              label="Title"
              id="task-title"
              name="task-title"
              required
            />
            <DatePicker
              label="Deadline"
              defaultValue={dayjs(deadline)}
              onChange={(event) => {
                setDeadline(event.format("MM/DD/YYYY"));
              }}
              required
            />
            <TextField
              fullWidth
              id="task-des"
              name="task-des"
              label="Description"
              multiline
              rows={4}
              required
            />
            <FormControlLabel
              mt={0}
              control={
                <Checkbox
                  checked={localIsDone}
                  onClick={() => {
                    setLocalIsDone(!localIsDone);
                  }}
                />
              }
              label={"Completed?"}
            />
            <Button type="submit">Create</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
