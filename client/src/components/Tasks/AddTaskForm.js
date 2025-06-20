import React, { useState, useEffect } from 'react'
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
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Autocomplete from '@mui/material/Autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMembers, selectAllMembers } from '../../features/members/membersSlice'

const statusOptions = [
  'Not Started',
  'In Review',
  'In Progress',
  'Completed'
]

export default function AddTaskForm({ open, onClose, onCreate }) {
  const dispatch = useDispatch()
  const members = useSelector(selectAllMembers)

  const [form, setForm] = useState({
    name: '',
    description: '',
    dateCreated: '',
    status: '',
    assignees: []
  })

  useEffect(() => {
    if (members.length === 0) {
      dispatch(fetchMembers())
    }
  }, [members, dispatch])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

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
            options={members}
            getOptionLabel={opt => opt.firstName + ' ' + opt.lastName}
            value={form.assignees}
            onChange={(_, newVal) => setForm(f => ({ ...f, assignees: newVal }))}
            renderTags={(value, getTagProps) =>
              value.map((option, i) => (
                <Chip key={option.id} label={`${option.firstName} ${option.lastName}`} {...getTagProps({ index: i })} />
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
            onCreate(form)
            onClose()
            setForm({ name: '', description: '', dateCreated: '', status: '', assignees: [] })
          }}
          disabled={!form.name || !form.dateCreated || !form.status}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}
