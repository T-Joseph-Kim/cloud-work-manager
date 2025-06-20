import { useEffect } from 'react'
import { Paper, Typography, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks } from '../features/tasks/tasksSlice'
import TaskCard from '../components/Tasks/TaskCard'
import AddTask from '../components/Tasks/AddTask'

export default function TaskList() {
  const dispatch = useDispatch()
  const { items: tasks, status } = useSelector(s => s.tasks)
  const currentUserId = useSelector(s => s.auth.currentUser?.id)
  const firstName = useSelector(s => s.profile.data?.firstName || '')

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks())
    }
  }, [status, dispatch])

  const myTasks = Array.isArray(tasks)
    ? tasks.filter(t => Array.isArray(t.employeeIds) && t.employeeIds.includes(currentUserId))
    : []

  const sortedTasks = [...myTasks].sort(
    (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
  )

  return (
    <Paper elevation={0} sx={{ p: 2, width: '95%', mx:'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ pl:1, mb:2 }}>
        {firstName ? `${firstName}'s Task Board` : 'Task Board'}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 1.5fr 1fr 2fr auto',
          alignItems: 'center',
          gap: 2,
          mb: 1,
          px: 1
        }}
      >
        <Typography variant="subtitle2">Task Name</Typography>
        <Typography variant="subtitle2">Date Created</Typography>
        <Typography variant="subtitle2">Status</Typography>
        <Typography variant="subtitle2">Assignees</Typography>
        <Box />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <AddTask />
        {sortedTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Box>
    </Paper>
  )
}
