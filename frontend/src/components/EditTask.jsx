import * as React from "react";
import {
  Box,
  Button,
  FormControl,
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

const names = ["Andre", "Carl", "Kevin"];

export default function EditTask({ editTask, taskInfo }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    editTask({
      id: taskInfo.id,
      title: data.get("task-title"),
      description: data.get("task-des"),
    });

    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
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
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="name-selector-label">Assignees</InputLabel>
              <Select
                labelId="name-selector-label"
                id="name-selector"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Assignees" />}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              defaultValue={taskInfo.title}
              label="Title"
              id="task-title"
              name="task-title"
            />
            <TextField
              fullWidth
              id="task-des"
              name="task-des"
              label="Description"
              multiline
              rows={4}
            />
            <Button type="submit">Edit</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}