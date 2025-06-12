import React from 'react';
import {
  Box,
  TextField,
  Button,
  InputAdornment
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

export default function LoginForm({ form, onChange, onSubmit }) {
  return (
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
        onChange={onChange}
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
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
        onChange={onChange}
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
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
        onClick={onSubmit}
        sx={{ mt: 1, borderRadius: '8px' }}
      >
        Login
      </Button>
    </Box>
  );
}
