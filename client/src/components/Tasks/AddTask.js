import React, { useState } from 'react'
import { Card, Box, Typography, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import AddTaskForm from './AddTaskForm'
import { useDispatch } from 'react-redux'
import { createTask } from '../../features/tasks/tasksSlice'

export default function AddTask() {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const handleCreate = (form) => {
    const employeeIds = form.assignees.map(a => a.id)
    dispatch(createTask({ 
      name: form.name,
      description: form.description,
      dateCreated: form.dateCreated,
      status: form.status,
      employeeIds
    }))
    setOpen(false)
  }

  return (
    <>
      <Card
        variant="outlined"
        onClick={() => setOpen(true)}
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 1.5fr 1fr 2fr auto',
          alignItems: 'center',
          p: 2,
          gap: 2,
          border: '2px dashed',
          borderColor: 'grey.400',
          borderRadius: 4,
          cursor: 'pointer',
          transition: 'background-color 0.15s',
          '&:hover': { backgroundColor: 'action.hover' }
        }}
      >
        <Typography variant="body1">Add New Task</Typography>
        <Box /><Box /><Box />
        <IconButton sx={{ width: 32, height: 32, '&:hover': { color: 'gray.600' } }}>
          <AddIcon fontSize="small" />
        </IconButton>
      </Card>

      <AddTaskForm
        open={open}
        onClose={() => setOpen(false)}
        onCreate={handleCreate}
      />
    </>
  )
}
