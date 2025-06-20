// src/components/Header.js
import React, { useState, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tooltip,
  TextField,
  Autocomplete,
  InputAdornment
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks } from '../features/tasks/tasksSlice'

export default function Header() {
  const history  = useHistory()
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')
  const [focused, setFocused] = useState(false)

  const { items: allTasks, status } = useSelector(s => s.tasks)
  const currentUser = useSelector(s => s.auth.currentUser)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchTasks())
  }, [status, dispatch])

  const myTasks = allTasks.filter(
    t => Array.isArray(t.employeeIds) && t.employeeIds.includes(currentUser.id)
  )

  const handleProfileClick = () => history.push('/profile')

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        width: '100%',
        bgcolor: 'white',
        boxShadow: 1,
        zIndex: theme => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title="Home" arrow>
          <Box
            component={Link}
            to="/home"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              mr: 2
            }}
          >
            <Box
              component="img"
              src="/images/logo.png"
              alt="Logo"
              sx={{ height: 36, mr: 1 }}
            />
            <Typography variant="h6" color="primary.main">
              Enterprise Workcenter
            </Typography>
          </Box>
        </Tooltip>

        <Box sx={{ flexGrow: 1 }} />

        <Autocomplete
          size="small"
          freeSolo
          disableClearable
          options={myTasks}
          getOptionLabel={opt => opt.name || ''}
          inputValue={inputValue}
          onInputChange={(_, v) => setInputValue(v)}
          open={focused && Boolean(inputValue)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(_, value) => {
            if (value?.id) {
              history.push(`/tasks/${value.id}`);
              setInputValue('');
            }
          }}
          popupIcon={<SearchIcon />}
          ListboxProps={{
            sx: {
              bgcolor: 'common.white',
              maxHeight: 200,
              overflowY: 'auto',
              '& .MuiAutocomplete-option': { typography: 'body2', px: 1 }
            }
          }}
          renderInput={params => (
            <TextField
              {...params}
              placeholder="Search tasks..."
              variant="outlined"
              sx={{
                width: 200,
                '& .MuiOutlinedInput-root': { borderRadius: '24px' },
                '& .MuiAutocomplete-popupIndicator, & .MuiAutocomplete-popupIndicatorOpen': {
                  transform: 'none !important'
                }
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          )}
          noOptionsText="No tasks found"
        />

        <Tooltip title="Your Profile" arrow>
          <IconButton onClick={handleProfileClick} sx={{ ml: 1 }}>
            <AccountCircleIcon
              sx={{
                fontSize: 40,
                color: 'primary.main',
                '&:hover': { transform: 'scale(1.1)' },
                transition: 'transform 0.2s'
              }}
            />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}
