import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Paper,
  IconButton,
  Button
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';

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
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #90caf9 0%, #e3f2fd 100%)'
      }}
    >
      <Paper
        elevation={2}
        sx={{
          position: 'relative',
          p: 4,
          mt: 5,
          boxShadow: 8,
          width: '80%',
          maxWidth: '1200px',
          mx: 'auto',
          borderRadius: 6,
          minHeight: '60vh',
        }}
      >
        <IconButton
          component={Link}
          to="/home"
          sx={{
            position: 'absolute',
            top: 20,
            left: 20,
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Avatar sx={{ width: 250, height: 250, bgcolor: 'primary.light' }}>
            <AccountCircleIcon sx={{ fontSize: 240, color: 'primary.main' }} />
          </Avatar>

          <Box
            component="form"
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
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

            <Box sx={{ textAlign: 'right' }}>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                startIcon={<ExitToAppIcon />}
              >
                Log Out
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
