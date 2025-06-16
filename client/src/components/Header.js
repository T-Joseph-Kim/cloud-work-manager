import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tooltip,
  TextField,
  Autocomplete
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useHistory, Link } from 'react-router-dom';

export default function Header() {
  const history = useHistory();
  const [inputValue, setInputValue] = useState('');

  const tasks = [
    { id: '1', name: 'Task 1' },
    { id: '2', name: 'Task 2' },
    { id: '3', name: 'Task 3' },
    { id: '1', name: 'Task 1' },
    { id: '2', name: 'Task 2' },
    { id: '3', name: 'Task 3' },
    { id: '1', name: 'Task 1' },
    { id: '2', name: 'Task 2' },
    { id: '3', name: 'Task 3' },
  ];

  const handleProfileClick = () => history.push('/profile');

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        width: '100%',
        bgcolor: 'white',
        boxShadow: 1,
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Home button */}
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

        {/* Task search */}
        <Autocomplete
          size="small"
          options={tasks}
          getOptionLabel={(opt) => opt.name}
          inputValue={inputValue}
          onInputChange={(_, value) => setInputValue(value)}
          open={inputValue.length > 0}
          onChange={(_, value) => {
            if (value) {
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
              '& .MuiAutocomplete-option': {
                typography: 'body2',
                px: 1
              }
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search tasks..."
              variant="outlined"
              sx={{
                width: 180,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '24px'
                },
                '& .MuiAutocomplete-popupIndicator, & .MuiAutocomplete-popupIndicatorOpen': {
                  transform: 'none !important',
                }
              }}
            />
          )}
          noOptionsText="No tasks found"
        />

        <Tooltip title="Profile Settings" arrow>
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
  );
}
