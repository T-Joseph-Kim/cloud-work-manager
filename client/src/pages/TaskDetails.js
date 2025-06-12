import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Paper, Box, Button } from '@mui/material';

const tasks = [
  { id: '1', name: 'Task 1', dateCreated: '2025-06-01', description: 'First task description', status: 'Pending', owner: 'Alice' },
  { id: '2', name: 'Task 2', dateCreated: '2025-06-02', description: 'Second task description', status: 'Completed', owner: 'Bob' },
  { id: '3', name: 'Task 3', dateCreated: '2025-06-03', description: 'Third task description', status: 'In Progress', owner: 'Carol' },
];

export default function TaskDetails() {
  const { id } = useParams();
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return <Typography>Task not found</Typography>;
  }

  return (
    <Paper style={{ padding: 16, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>Task Details</Typography>
      <Box mb={2}>
        <Typography><strong>Name:</strong> {task.name}</Typography>
        <Typography><strong>Date Created:</strong> {task.dateCreated}</Typography>
        <Typography><strong>Status:</strong> {task.status}</Typography>
        <Typography><strong>Owner:</strong> {task.owner}</Typography>
        <Typography><strong>Description:</strong> {task.description}</Typography>
      </Box>
      <Button component={Link} to="/tasks" variant="contained">
        Back to List
      </Button>
    </Paper>
  );
}
