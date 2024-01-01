import { useState, useRef, useEffect } from "react";
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
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
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

export default function EditTask({
  taskInfo,
  setisDone,
  localIsDone,
  setLocalIsDone,
  editTask,
}) {
  const [deadline, setDeadline] = useState(taskInfo.deadline); //date as a string rn
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setLocalIsDone(taskInfo.isDone);
    setDeadline(taskInfo.deadline);
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    editTask({
      deadline: deadline,
      description: data.get("task-des"),
      isDone: localIsDone,
      title: data.get("task-title"),
    });
    setisDone(taskInfo.isDone);
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleOpen} data-cy="button-edit-task">
        <EditIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={handleSubmit} sx={style}>
          <Stack spacing={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Task
            </Typography>
            <TextField
              data-cy="input-edit-title"
              fullWidth
              defaultValue={taskInfo.title}
              label="Title"
              id="task-title"
              name="task-title"
            />
            <DatePicker
              label="Deadline"
              defaultValue={dayjs(deadline)}
              onChange={(event) => {
                setDeadline(event.format("MM/DD/YYYY"));
              }}
            />

            <TextField
              data-cy="input-edit-description"
              fullWidth
              defaultValue={taskInfo.description}
              id="task-des"
              name="task-des"
              label="Description"
              multiline
              rows={4}
            />
            <FormControlLabel
              mt={0}
              control={
                <Checkbox
                  checked={localIsDone}
                  onClick={() => {
                    // info.current.isDone = !info.current.isDone;
                    setLocalIsDone(!localIsDone);
                  }}
                />
              }
              label={"Completed?"}
            />
            <Button data-cy="button-edit-submit" type="submit">Save</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
