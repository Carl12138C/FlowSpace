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
import AddIcon from '@mui/icons-material/Add';

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

const names = [
    "Andre",
    "Carl",
    "Kevin"
];

export default function TaskInput() {
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
      typeof value === 'string' ? value.split(',') : value,
    );
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
        <Box sx={style}>
          <Stack spacing={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create A Task
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
            <TextField fullWidth label="Title" id="new-task-title" />
            <TextField
              fullWidth
              id="new-task-des"
              label="Description"
              multiline
              rows={4}
            />
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
