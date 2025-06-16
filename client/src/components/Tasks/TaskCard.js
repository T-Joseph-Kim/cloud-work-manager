import React, { useState } from 'react';
import {
  Card,
  Box,
  Typography,
  IconButton,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

// dummy member data
const membersData = {
  m1: { firstName: 'John', lastName: 'Doe', dob: '1990-01-01' },
  m2: { firstName: 'Jane', lastName: 'Smith', dob: '1985-05-15' },
  m3: { firstName: 'Bob', lastName: 'Johnson', dob: '1978-09-22' },
  // add more as needed
};

function getOrdinal(day) {
  if (day % 100 >= 11 && day % 100 <= 13) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}${getOrdinal(day)}, ${year}`;
}

const statusColors = {
  Completed: '#4caf50',
  Pending:   '#ff9800',
  'In Progress': '#2196f3'
};

export default function TaskCard({ task }) {
  const [detailOpen, setDetailOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const openDetail = id => {
    setSelectedMember({ id, ...membersData[id] });
    setDetailOpen(true);
  };
  const closeDetail = () => setDetailOpen(false);

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 1.5fr 0.80fr 2fr auto',
          alignItems: 'center',
          p: 2,
          gap: 2
        }}
      >
        {/* Task Name */}
        <Typography variant="body1">{task.name}</Typography>

        {/* Date Created */}
        <Typography variant="body2" color="text.secondary">
          {formatDate(task.dateCreated)}
        </Typography>

        {/* Status Badge */}
        <Chip
          label={task.status}
          sx={{
            bgcolor: statusColors[task.status] || 'grey',
            color: 'white',
            borderRadius: '8px',
          }}
        />

        {/* Avatars */}
        <Box sx={{ display: 'flex', alignItems: 'center', pl:4 }}>
          {task.employeeIds.slice(0, 2).map((id, idx) => (
            <Tooltip key={id} title="See Employee" arrow>
              <Avatar
                onClick={() => openDetail(id)}
                sx={{
                  width: 32,
                  height: 32,
                  cursor: 'pointer',
                  bgcolor: 'primary.main',
                  color: 'common.white',
                  ml: idx === 0 ? 0 : '-4px',
                  zIndex: task.employeeIds.length - idx,
                  boxShadow: '0 0 2px 2px rgba(255,255,255,0.8)'
                }}
              >
                {membersData[id].firstName[0]}
              </Avatar>
            </Tooltip>
          ))}
          {task.employeeIds.length > 2 && (
            <Tooltip title="Employee List" arrow>
              <Avatar
                onClick={() => setListOpen(true)}
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: '0.75rem',
                  bgcolor: 'rgba(33, 150, 243, 0.1)',
                  color: 'primary.dark',
                  cursor: 'pointer',
                  ml: '-8px',
                  zIndex: 0,
                  boxShadow: '0 0 4px 2px rgba(255,255,255,0.8)'
                }}
              >
                +{task.employeeIds.length - 2}
              </Avatar>
            </Tooltip>
          )}
        </Box>

        {/* Edit Icon */}
        <Tooltip title="Edit Task" arrow>
          <IconButton
            component={Link}
            to={`/tasks/${task.id}`}
            size="small"
            sx={{
              bgcolor: '#009688',
              color: 'common.white',
              width: 32,
              height: 32,
              '&:hover': { bgcolor: '#00796b' }
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Card>

      {/* Member Detail Dialog */}
      <Dialog open={detailOpen} onClose={closeDetail}>
        <DialogTitle sx={{ position: 'relative', pr: 6 }}>
          Member Details
          <IconButton
            onClick={closeDetail}
            sx={{ position: 'absolute', right: 8, top: 10 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedMember && (
            <>
              <Typography><strong>Member ID:</strong> {selectedMember.id}</Typography>
              <Typography><strong>First Name:</strong> {selectedMember.firstName}</Typography>
              <Typography><strong>Last Name:</strong> {selectedMember.lastName}</Typography>
              <Typography><strong>DOB:</strong> {selectedMember.dob}</Typography>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Employee List Dialog */}
      <Dialog open={listOpen} onClose={() => setListOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>
          Assigned Employees
          <IconButton
            onClick={() => setListOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {task.employeeIds.map(id => (
              <Grid item xs={4} key={id}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Tooltip title="See Employee" arrow>
                    <Avatar
                      onClick={() => { openDetail(id); setListOpen(false); }}
                      sx={{
                        width: 48,
                        height: 48,
                        cursor: 'pointer',
                        bgcolor: 'primary.main',
                        color: 'common.white'
                      }}
                    >
                      {membersData[id].firstName[0]}
                    </Avatar>
                  </Tooltip>
                  <Typography variant="caption">{membersData[id].firstName}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}