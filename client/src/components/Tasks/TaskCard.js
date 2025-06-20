import React, { useState, useEffect } from 'react'
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
  Grid,
  Tooltip
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMember } from '../../features/members/membersSlice'

// Helper to format date with ordinals
function getOrdinal(day) {
  if (day % 100 >= 11 && day % 100 <= 13) return 'th'
  switch (day % 10) {
    case 1: return 'st'
    case 2: return 'nd'
    case 3: return 'rd'
    default: return 'th'
  }
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number)
  const dt = new Date(year, month - 1, day)
  const monthName = dt.toLocaleString('en-US', { month: 'long' })
  return `${monthName} ${day}${getOrdinal(day)}, ${year}`
}

const statusColors = {
  Completed:     '#4caf50',
  'In Review':   '#ff9800',
  'Not Started': '#f44336',
  'In Progress': '#2196f3'
}

export default function TaskCard({ task }) {
  const dispatch   = useDispatch()
  const members    = useSelector(state => state.members.entities)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ids        = Array.isArray(task.employeeIds) ? task.employeeIds : []

  const [detailOpen, setDetailOpen]       = useState(false)
  const [listOpen, setListOpen]           = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)

  useEffect(() => {
    ids.forEach(id => {
      if (!members[id]) {
        dispatch(fetchMember(id))
      }
    })
  }, [ids, members, dispatch])

  const openDetail = id => {
    const mem = members[id]
    if (mem) {
      setSelectedMember(mem)
    }
    setDetailOpen(true)
  }

  const closeDetail = () => {
    setDetailOpen(false)
    setSelectedMember(null)
  }

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 1.5fr 0.8fr 2fr auto',
          alignItems: 'center',
          p: 2,
          gap: 2,
          borderRadius: 4,
          transition: 'transform 0.15s, box-shadow 0.15s',
          boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 8px 24px rgba(0,0,0,0.15)'
          }
        }}
      >
        {/* Task Name */}
        <Typography variant="body1">{task.name}</Typography>

        {/* Date Created */}
        <Typography variant="body2" color="text.secondary">
          {formatDate(task.dateCreated)}
        </Typography>

        {/* Status */}
        <Chip
          label={task.status}
          sx={{
            bgcolor: statusColors[task.status] || 'grey',
            color: 'white',
            borderRadius: '8px'
          }}
        />

        {/* Avatars */}
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 4 }}>
          {ids.slice(0, 2).map((id, idx) => {
            const mem = members[id]
            if (!mem) return null
            return (
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
                    zIndex: ids.length - idx,
                    boxShadow: '0 0 2px 2px rgba(255,255,255,0.8)'
                  }}
                >
                  {mem.firstName.charAt(0)}
                </Avatar>
              </Tooltip>
            )
          })}
          {ids.length > 2 && (
            <Tooltip title="Employee List" arrow>
              <Avatar
                onClick={() => setListOpen(true)}
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: '0.75rem',
                  bgcolor: 'rgba(33,150,243,0.1)',
                  color: 'primary.dark',
                  cursor: 'pointer',
                  ml: '-8px',
                  zIndex: 0,
                  boxShadow: '0 0 4px 2px rgba(255,255,255,0.8)'
                }}
              >
                +{ids.length - 2}
              </Avatar>
            </Tooltip>
          )}
        </Box>

        {/* Edit Button */}
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

      {/* Single-Member Detail Dialog */}
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
          {selectedMember ? (
            <>
              <Typography>
                <strong>Member ID:</strong> {selectedMember.id}
              </Typography>
              <Typography>
                <strong>First Name:</strong> {selectedMember.firstName}
              </Typography>
              <Typography>
                <strong>Last Name:</strong> {selectedMember.lastName}
              </Typography>
              <Typography>
                <strong>DOB:</strong> {selectedMember.dob}
              </Typography>
            </>
          ) : (
            <Typography>Loading…</Typography>
          )}
        </DialogContent>
      </Dialog>

      {/* Full Employee List Dialog */}
      <Dialog
        open={listOpen}
        onClose={() => setListOpen(false)}
        fullWidth
        maxWidth="xs"
      >
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
            {ids.map(id => {
              const mem = members[id]
              if (!mem) return null
              return (
                <Grid item xs={4} key={id}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <Tooltip title="See Employee" arrow>
                      <Avatar
                        onClick={() => {
                          openDetail(id)
                          setListOpen(false)
                        }}
                        sx={{
                          width: 48,
                          height: 48,
                          cursor: 'pointer',
                          bgcolor: 'primary.main',
                          color: 'common.white'
                        }}
                      >
                        {mem.firstName.charAt(0)}
                      </Avatar>
                    </Tooltip>
                    <Typography variant="caption">
                      {mem.firstName}
                    </Typography>
                  </Box>
                </Grid>
              )
            })}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}