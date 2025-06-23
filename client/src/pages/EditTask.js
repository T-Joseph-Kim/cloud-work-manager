import { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogActions
} from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchTaskById,
  updateTask,
  deleteTask,
  selectTaskById
} from '../features/tasks/tasksSlice'
import {
  fetchMembers,
  selectAllMembers
} from '../features/members/membersSlice'

const statusOptions = [
  'Not Started',
  'In Review',
  'In Progress',
  'Completed'
]

export default function EditTask() {
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  const task = useSelector(state => selectTaskById(state, id))
  const members = useSelector(selectAllMembers)

  const [form, setForm] = useState({
    name: '',
    dateCreated: '',
    status: '',
    assignees: [],
    description: ''
  })

  const [confirmOpen, setConfirmOpen] = useState(false);

  // fetch task + member list on mount
  useEffect(() => {
    dispatch(fetchTaskById(id))
    dispatch(fetchMembers())
  }, [dispatch, id])

  // when task loads, seed the form
  useEffect(() => {
    if (task && members.length) {
      setForm({
        name: task.name,
        dateCreated: task.dateCreated,
        status: task.status,
        description: task.description,
        assignees: members.filter(m => task.employeeIds.includes(m.id))
      })
    }
  }, [task, members])

  if (!task) {
    return (
      <Typography
        sx={{ mt: 4, textAlign: 'center' }}
        variant="h6"
      >
        Loading task…
      </Typography>
    )
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSave = async () => {
    await dispatch(
      updateTask({
        id,
        changes: {
          name: form.name,
          dateCreated: form.dateCreated,
          status: form.status,
          description: form.description,
          employeeIds: form.assignees.map(a => a.id)
        }
      })
    ).unwrap()
    history.push('/home')
  }

  const handleDelete = async () => {
    await dispatch(deleteTask(id)).unwrap()
    history.push('/home')
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, #e3f2fd 0%, #90caf9 100%)',
        overflow: 'auto',
        p: 4
      }}
    >
      <Paper
        sx={{
          mt: 5,
          p: 4,
          maxWidth: 1000,
          mx: 'auto',
          borderRadius: 2,
          bgcolor: 'background.paper'
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
            options={members}
            getOptionLabel={m => `${m.firstName} ${m.lastName}`}
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
            <Box>
              <Button
                component={Link}
                to="/home"
              >
                Cancel
              </Button>
              <Button
                color = "error"
                sx={{ ml: 2 }}
                onClick={() => setConfirmOpen(true)}
              >
                Delete
              </Button>
            </Box>

            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!form.name || !form.dateCreated || !form.status || !form.description || form.assignees.length === 0}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Paper>
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      >
        <DialogTitle>
          {task.status !== 'Completed'
          ? `Are you sure you want to delete this task? It's still in its "${task.status}" phase!`
          : 'Are you sure you want to delete this completed task?'}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
          <Button color="error" onClick={async () => {
              await handleDelete();
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}