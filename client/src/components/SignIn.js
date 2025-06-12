import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';

export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => { e.preventDefault(); /* stub: on success, redirect to /tasks */ };

  return (
    <Paper style={{ padding: 16, maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>Sign In</Typography>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={handleChange}
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Sign In
          </Button>
        </Box>
      </form>
    </Paper>
  );
}