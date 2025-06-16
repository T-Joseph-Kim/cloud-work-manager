import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Box,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '@mui/material/Autocomplete';

const employeeOptions = [
  { id: 'm1', name: 'John Doe' },
  { id: 'm2', name: 'Jane Smith' },
  { id: 'm3', name: 'Bob Johnson' },
];

const statusOptions = [
  'Not Started',
  'In Review',
  'In Progress',
  'Completed'
];

export default function AddTaskForm({ open, onClose, onCreate }) {
  const [form, setForm] = useState({
    name: '',
    dateCreated: '',
    status: '',
    assignees: [],
    description: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Create New Task
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ py: 3, px: 4 }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <TextField
            label="Task Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Task Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />

          <TextField
            label="Date Created"
            name="dateCreated"
            type="date"
            value={form.dateCreated}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            fullWidth
          >
            {statusOptions.map(opt => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>

          <Autocomplete
            multiple
            options={employeeOptions}
            getOptionLabel={opt => opt.name}
            value={form.assignees}
            onChange={(_, newVal) => setForm(f => ({ ...f, assignees: newVal }))}
            renderTags={(value, getTagProps) =>
              value.map((option, i) => (
                <Chip
                  key={option.id}
                  label={option.name}
                  {...getTagProps({ index: i })}
                />
              ))
            }
            renderInput={params => (
              <TextField
                {...params}
                label="Assignees"
                placeholder="Select employees"
                fullWidth
              />
            )}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => {
            onCreate(form);
            onClose();
          }}
          disabled={!form.name || !form.dateCreated || !form.status}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
