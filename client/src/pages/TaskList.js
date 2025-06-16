import { Paper, Typography, Box } from '@mui/material';
import TaskCard from '../components/Tasks/TaskCard';
import AddTask from '../components/Tasks/AddTask';

const tasks = [
  { id: '1', name: 'Task 1', dateCreated: '2025-06-01', status: 'In Review', employeeIds: ['m1','m2','m3'] },
  { id: '2', name: 'Task 2', dateCreated: '2025-06-02', status: 'Completed', employeeIds: ['m1','m2','m3','m1','m2','m3'] },
  { id: '3', name: 'Task 3', dateCreated: '2025-06-03', status: 'In Progress', employeeIds: ['m1','m2'] },
  { id: '4', name: 'Task 4', dateCreated: '2025-06-04', status: 'Not Started', employeeIds: ['m1','m2'] },
];

export default function TaskList() {
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
  );
  return (
    <Paper elevation={0} sx={{ p: 2, width: '95%', mx:'auto' }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ pl:1, mb: 2 }}
      >
        Task Board
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
  );
}
