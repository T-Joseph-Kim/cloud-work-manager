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
  Chip,
  Tooltip
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
  const currentUserId = useSelector(state => state.auth.currentUser?.id)

  const [form, setForm] = useState({
    name: '',
    description: '',
    dateCreated: '',
    status: '',
    assignees: []
  })

  // load members once
  useEffect(() => {
    if (members.length === 0) {
      dispatch(fetchMembers())
    }
  }, [members, dispatch])

  // once members are loaded, initialize assignees with current user
  useEffect(() => {
    if (members.length && currentUserId) {
      const self = members.find(m => m.id === currentUserId)
      if (self) {
        setForm(f => ({
          ...f,
          assignees: [self]
        }))
      }
    }
  }, [members, currentUserId])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleAssigneesChange = (_, newVal) => {
    const self = members.find(m => m.id === currentUserId)
    const others = newVal.filter(m => m.id !== currentUserId)
    setForm(f => ({ 
      ...f, 
      assignees: self ? [self, ...others] : others 
    }))
  }

  const handleCreate = () => {
    onCreate(form)
    onClose()
    const self = members.find(m => m.id === currentUserId)
    setForm({
      name: '',
      description: '',
      dateCreated: '',
      status: '',
      assignees: self ? [self] : []
    })
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
            getOptionLabel={opt => `${opt.firstName} ${opt.lastName}`}
            value={form.assignees}
            onChange={handleAssigneesChange}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const isSelf = option.id === currentUserId
                const tagProps = getTagProps({ index })
                if (isSelf) {
                  delete tagProps.onDelete
                  delete tagProps.key
                }
                const chip = (
                  <Chip
                    {...tagProps}
                    key={option.id}
                    label={`${option.firstName} ${option.lastName}`}
                    color={isSelf ? 'primary' : 'default'}
                  />
                );

                return isSelf ? (
                  <Tooltip
                    key={option.id}
                    title="Task Assigment Required!"
                    arrow
                  >
                    {chip}
                  </Tooltip>
                ) : (
                  chip
                );
              })
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
          onClick={handleCreate}
          disabled={
            !form.name ||
            !form.dateCreated ||
            !form.status ||
            !form.description ||
            form.assignees.length === 0
          }
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}
