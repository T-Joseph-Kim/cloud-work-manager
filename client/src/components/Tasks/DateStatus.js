import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  MenuItem,
  Chip,
  Tooltip,
  Box
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'

const statusColors = {
  Completed: '#4caf50',
  'In Review': '#ff9800',
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#1976d2',
          px: 2,
          py: 1
        }}
      >
        <Typography variant="h6" sx={{ color: 'white' }}>
          Date & Status
        </Typography>
        {editing ? (
          <Tooltip title="Save Changes" arrow>
            <IconButton
              onClick={onSave}
              size="small"
              sx={{
                bgcolor: '#3f51b5',
                color: 'white',
                '&:hover': { bgcolor: '#303f9f' },
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
                bgcolor: '#3f51b5',
                color: 'white',
                '&:hover': { bgcolor: '#303f9f' },
                borderRadius: '50%',
                p: 0.5
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <CardContent>
        {editing ? (
          <>
            <TextField
              type="date"
              label="Date Created"
              name="dateCreated"
              InputLabelProps={{ shrink: true }}
              value={form.dateCreated}
              onChange={onChange}
              size="small"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              select
              label="Status"
              name="status"
              value={form.status}
              onChange={onChange}
              size="small"
              fullWidth
            >
              {statusOptions.map(opt => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  sx={{ mb: 1, fontWeight: 500, fontSize: '1rem' }}
                >
                  Date Created
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                  {new Date(form.dateCreated).toLocaleDateString()}
                </Typography>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  sx={{ mb: 1, fontWeight: 500, fontSize: '1rem' }}
                >
                  Status
                </Typography>
                <Chip
                  label={form.status}
                  size="medium"
                  sx={{
                    fontSize: '1rem',
                    height: 32,
                    bgcolor: statusColors[form.status] || 'grey',
                    color: 'white',
                    width: 128,
                  }}
                />
              </Box>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  )
}
