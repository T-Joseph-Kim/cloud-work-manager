import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Paper } from '@mui/material';

const tasks = [
  { id: '1', name: 'Task 1', dateCreated: '2025-06-01', status: 'Pending' },
  { id: '2', name: 'Task 2', dateCreated: '2025-06-02', status: 'Completed' },
  { id: '3', name: 'Task 3', dateCreated: '2025-06-03', status: 'In Progress' },
];

export default function TaskList() {
  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>Task List</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map(task => (
            <TableRow key={task.id}>
              <TableCell>{task.name}</TableCell>
              <TableCell>{task.dateCreated}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>
                <Button component={Link} to={`/tasks/${task.id}`} size="small">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}