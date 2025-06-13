import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Paper
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Profile() {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    dob: '1990-01-01',
    memberId: 'm1',
  });

  const handleChange = e =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  return (
    <Box sx={{ p: 4 }}>
      <Paper
        elevation={2}
        sx={{
          p: 4,
          maxWidth: 800,
          mx: 'auto',
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Avatar sx={{ width: 100, height: 100, bgcolor: 'primary.light' }}>
            <AccountCircleIcon sx={{ fontSize: 80, color: 'primary.main' }} />
          </Avatar>

          <Box
            component="form"
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
            noValidate
          >
            <Typography variant="h5" sx={{ fontWeight: 'medium' }}>
              Profile Details
            </Typography>

            <TextField
              label="First Name"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Last Name"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              value={profile.dob}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              label="Member ID"
              name="memberId"
              value={profile.memberId}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
