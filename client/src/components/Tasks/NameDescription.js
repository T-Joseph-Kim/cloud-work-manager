import React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Tooltip
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'

export default function NameDescriptionCard({
  editing,
  form,
  onEdit,
  onSave,
  onChange
}) {
  return (
    <Card>
      <CardHeader
        title={
          editing ? (
            <TextField
              label="Task Name"
              name="name"
              value={form.name}
              onChange={onChange}
              variant="outlined"
              size="small"
              sx={{ width: '90%' }}
            />
          ) : (
            <Typography variant="h6">{form.name}</Typography>
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
            <Tooltip title="Edit Name/Description" arrow>
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
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={form.description}
            onChange={onChange}
            variant="outlined"
            size="small"
          />
        ) : (
          <Typography variant="body1">{form.description}</Typography>
        )}
      </CardContent>
    </Card>
  )
}
