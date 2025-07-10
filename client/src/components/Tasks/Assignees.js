import {
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Autocomplete from '@mui/material/Autocomplete'
import PersonIcon from '@mui/icons-material/Person'

export default function AssigneesCard({
  assignees,
  selectedMember,
  onSelectMember,
  onRemoveMember,
  onAddOpen,
  addOpen,
  onAddClose,
  onAdd,
  available,
  selectedForAdd,
  onAddChange,
  currentUserId
}) {
  // Move current user to the front of the list
  const sortedAssignees = [
    ...assignees.filter(a => a.id === currentUserId),
    ...assignees.filter(a => a.id !== currentUserId)
  ]

  return (
    <>
      <Card sx={{ flex: 1.5, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#1976d2',
            px: 2,
          }}
        >
          <Typography variant="h6" sx={{ color: 'white' }}>
            Assignees
          </Typography>
          <IconButton onClick={onAddOpen} sx={{ color: 'white' }}>
            <AddIcon />
            <Typography sx={{ ml: 0.5, color: 'white' }}>Add New</Typography>
          </IconButton>
        </Box>

        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {sortedAssignees.map(a => {
              const isSelected = selectedMember?.id === a.id
              return (
                <Chip
                  key={a.id}
                  label={`${a.firstName} ${a.lastName}`}
                  onClick={() => onSelectMember(a)}
                  onDelete={a.id === currentUserId ? undefined : () => onRemoveMember(a.id)}
                  deleteIcon={a.id === currentUserId ? null : undefined}
                  sx={{
                    backgroundColor: isSelected ? '#1976d2' : '#bbdefb',
                    color: isSelected ? 'white' : 'black',
                    '&:hover': {
                      backgroundColor: isSelected ? '#1565c0' : '#bbdefb',
                      cursor: 'pointer'
                    },
                  }}
                />
              )
            })}
          </Box>
          {selectedMember && (
            <Box
              sx={{
                mt: 4,
                p: 4,
                border: '1px solid #ccc',
                borderRadius: 2,
                backgroundColor: '#f5faff'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PersonIcon sx={{ color: '#1976d2', mr: 1, fontSize: '2rem' }} />
                <Typography sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                  {selectedMember.firstName} {selectedMember.lastName}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Typography sx={{ fontSize: '1.1rem' }}>
                  <strong>Employee ID:</strong> {selectedMember.id}
                </Typography>
                <Typography sx={{ fontSize: '1.1rem' }}>
                  <strong>DOB:</strong> {selectedMember.dob}
                </Typography>
              </Box>
            </Box>
          )}

        </CardContent>
      </Card>

      <Dialog open={addOpen} onClose={onAddClose} fullWidth maxWidth="sm">
        <DialogTitle>Select Assignees</DialogTitle>
        <DialogContent>
          <Autocomplete
            multiple
            options={available}
            getOptionLabel={opt => `${opt.firstName} ${opt.lastName}`}
            value={selectedForAdd}
            onChange={onAddChange}
            renderInput={params => (
              <TextField {...params} label="Available" placeholder="Select..." />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onAddClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={onAdd}
            disabled={!selectedForAdd || selectedForAdd.length === 0}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
