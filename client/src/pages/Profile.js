import React, { useEffect } from 'react'
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Paper,
  IconButton,
  Button
} from '@mui/material'
import { Link, useHistory } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ArrowBackIosIcon  from '@mui/icons-material/ArrowBackIos'
import ExitToAppIcon     from '@mui/icons-material/ExitToApp'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from '../features/profile/profileSlice'
import { logout }       from '../features/auth/authSlice'

export default function Profile() {
  const dispatch = useDispatch()
  const history  = useHistory()
  const userId   = useSelector(state => state.auth.currentUser?.id)
  const profile  = useSelector(state => state.profile.data)

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfile(userId))
    }
  }, [dispatch, userId])

  const handleLogout = () => {
    dispatch(logout())
    history.push('/login')
  }

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
          width: '80%',
          maxWidth: '1200px',
          mx: 'auto',
          borderRadius: 6,
          minHeight: '60vh'
        }}
      >
        <IconButton
          component={Link}
          to="/home"
          sx={{ position: 'absolute', top: 20, left: 20 }}
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
              gap: 6
            }}
            noValidate
          >
            <Typography variant="h5" sx={{ fontWeight: 'medium' }}>
              Profile Details
            </Typography>

            <TextField
              label="First Name"
              value={profile?.firstName || ''}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <TextField
              label="Last Name"
              value={profile?.lastName || ''}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <TextField
              label="Date of Birth"
              type="date"
              value={profile?.dob || ''}
              InputLabelProps={{ shrink: true }}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <TextField
              label="Employee ID"
              value={profile?.id || ''}
              InputProps={{ readOnly: true }}
              fullWidth
            />

            <Box sx={{ textAlign: 'right' }}>
              <Button
                variant="outlined"
                startIcon={<ExitToAppIcon />}
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
