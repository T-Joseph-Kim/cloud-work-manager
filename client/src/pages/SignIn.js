import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useHistory } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

export default function SignIn() {
  const [form, setForm] = useState({ employeeId: '', password: '' });
  const history = useHistory();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSignIn = () => history.push('/tasks');

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #90caf9 100%)',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 6,
          maxWidth: 450,
          width: '100%',
          textAlign: 'center',
          borderRadius: 10,
          minHeight: '350px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 1,
          }}
        >
          <Box
            component="img"
            src="/images/logo.png"
            alt="Logo"
            sx={{ height: 50, mr: 2, mb: 1 }}
          />
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ color: 'primary.main' }}
          >
            Enterprise Workcenter
          </Typography>
        </Box>

        <Typography component="h2" gutterBottom sx={{fontSize: '30px'}}>
          Login
        </Typography>

        <Box
          component="form"
          noValidate
          sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Employee ID"
            name="employeeId"
            fullWidth
            value={form.employeeId}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={form.password}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            size="large"
            onClick={handleSignIn}
            sx={{ mt: 1, borderRadius: '8px' }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
