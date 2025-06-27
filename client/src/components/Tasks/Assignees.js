import React from 'react'
import {
  Card,
  CardHeader,
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

export default function AssigneesCard({
  assignees,
  selectedMember,
  onSelectMember,
  onRemoveMember,

  // match the parent:
  onAddOpen,
  addOpen,
  onAddClose,
  onAdd,

  available,
  selectedForAdd,
  onAddChange
}) {
  return (
    <>
      <Card sx={{ flex: 1.5, display: 'flex', flexDirection: 'column' }}>
        <CardHeader
          title="Assignees"
          action={
            <IconButton onClick={onAddOpen}>
              <AddIcon />
              <Typography sx={{ ml: 1 }}>Add New</Typography>
            </IconButton>
          }
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {assignees.map(a => (
              <Chip
                key={a.id}
                label={`${a.firstName} ${a.lastName}`}
                onClick={() => onSelectMember(a)}
                onDelete={() => onRemoveMember(a.id)}
              />
            ))}
          </Box>
          {selectedMember && (
            <Box sx={{ mt: 2 }}>
              <Typography><strong>ID:</strong> {selectedMember.id}</Typography>
              <Typography>
                <strong>Name:</strong> {selectedMember.firstName} {selectedMember.lastName}
              </Typography>
              <Typography><strong>DOB:</strong> {selectedMember.dob}</Typography>
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
