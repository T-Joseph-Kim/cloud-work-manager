import { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import {
  Paper,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

const employeeOptions = [
  { id: 'm1', name: 'John Doe' },
  { id: 'm2', name: 'Jane Smith' },
  { id: 'm3', name: 'Bob Johnson' },
];

// status choices
const statusOptions = [
  'Not Started',
  'In Review',
  'In Progress',
  'Completed'
];

// dummy tasks (now with description)
const tasks = [
  {
    id: '1',
    name: 'Task 1',
    dateCreated: '2025-06-01',
    status: 'In Review',
    employeeIds: ['m1','m2'],
    description: 'Lorem ipsum dolor sit amet.'
  },
  {
    id: '2',
    name: 'Task 2',
    dateCreated: '2025-06-02',
    status: 'Completed',
    employeeIds: ['m2','m3','m1'],
    description: 'Consectetur adipiscing elit.'
  },
  {
    id: '3',
    name: 'Task 3',
    dateCreated: '2025-06-03',
    status: 'Not Started',
    employeeIds: ['m1'],
    description: 'Sed do eiusmod tempor.'
  },
  {
    id: '4',
    name: 'Task 4',
    dateCreated: '2025-06-03',
    status: 'Not Started',
    employeeIds: ['m1'],
    description: 'Sed do eiusmod tempor.'
  }
];

export default function EditTask() {
  const { id } = useParams();
  const history = useHistory();

  const task = tasks.find(t => t.id === id);
  const [form, setForm] = useState({
    name: '',
    dateCreated: '',
    status: '',
    assignees: [],
    description: ''
  });

  // initialize form when task loads
  useEffect(() => {
    if (task) {
      setForm({
        name: task.name,
        dateCreated: task.dateCreated,
        status: task.status,
        description: task.description || '',
        assignees: employeeOptions.filter(e => task.employeeIds.includes(e.id))
      });
    }
  }, [task]);

  if (!task) {
    return <Typography>Task not found</Typography>;
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSave = () => {
    // here you'd send `form` to your API...
    console.log('Saving task:', { id, ...form });
    history.push('/tasks');
  };

  return (
    <Paper
      sx={{
        p: 4,
        maxWidth: 1000,
        mx: 'auto',
        my: 1,
        borderRadius: 2
      }}
    >
      <Typography variant="h5" gutterBottom>
        Edit Task
      </Typography>

      <Box
        component="form"
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}
      >
        <TextField
          label="Task Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Description"
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
          getOptionLabel={o => o.name}
          value={form.assignees}
          onChange={(_, newVal) =>
            setForm(f => ({ ...f, assignees: newVal }))
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

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button component={Link} to="/home">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={
              !form.name || !form.dateCreated || !form.status
            }
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
