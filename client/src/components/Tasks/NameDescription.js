import {
  Card,
  CardContent,
  Box,
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
      {/* Blue Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#1976d2',
          px: 2,
          py: 0.5
        }}
      >
        <Typography variant="h6" sx={{ color: 'white' }}>
          Name & Description
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
          <Tooltip title="Edit Name/Description" arrow>
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
              label="Task Name"
              name="name"
              value={form.name}
              onChange={onChange}
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2 }}
            />
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
          </>
        ) : (
          <>
            <Typography variant="caption" color="textSecondary" sx={{ mb: 0.5 }}>
              Name
            </Typography>
            <Typography variant="h6" gutterBottom>
              {form.name}
            </Typography>

            <Typography variant="caption" color="textSecondary" sx={{ mb: 0.5 }}>
              Description
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              {form.description}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  )
}
