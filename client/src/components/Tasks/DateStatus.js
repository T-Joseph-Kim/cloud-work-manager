import React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  TextField,
  MenuItem,
  Chip,
  Tooltip
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'

// map each status to its color
const statusColors = {
  Completed:     '#4caf50',
  'In Review':   '#ff9800',
  'Not Started': '#f44336',
  'In Progress': '#2196f3'
}

export default function DateStatusCard({
  editing,
  form,
  onEdit,
  onSave,
  onChange,
  statusOptions
}) {
  return (
    <Card>
      <CardHeader
        title={
          editing ? (
            <TextField
              type="date"
              label="Date Created"
              name="dateCreated"
              InputLabelProps={{ shrink: true }}
              value={form.dateCreated}
              onChange={onChange}
              size="small"
              sx={{ width: '90%' }}
            />
          ) : (
            <Typography variant="h6">
              Date Created: {new Date(form.dateCreated).toLocaleDateString()}
            </Typography>
          )
        }
        action={
          editing ? (
            <Tooltip title="Save Changes" arrow>
              <IconButton
                onClick={onSave}
                size="small"
                sx={{
                  bgcolor: '#009688',
                  color: 'white',
                  '&:hover': { bgcolor: '#00796b' },
                  borderRadius: '50%',
                  p: 0.5
                }}
              >
                <CheckIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Edit Date/Status" arrow>
              <IconButton
                onClick={onEdit}
                size="small"
                sx={{
                  bgcolor: '#009688',
                  color: 'white',
                  '&:hover': { bgcolor: '#00796b' },
                  borderRadius: '50%',
                  p: 0.5
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )
        }
      />

      <CardContent>
        {editing ? (
          <TextField
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={onChange}
            size="small"
            sx={{ width: '40ch' }}
          >
            {statusOptions.map(opt => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <Typography variant="h6" sx={{ mt: 1 }}>
            Status:{' '}
            <Chip
              label={form.status}
              size="small"
              sx={{
                bgcolor: statusColors[form.status] || 'grey',
                color: 'white'
              }}
            />
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
