import { Card, Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router-dom';

export default function AddTask() {
  const history = useHistory();

  const handleClick = () => {
    history.push('/tasks/new');
  };

  return (
    <Card
      variant="outlined"
      onClick={handleClick}
      sx={{
        display: 'grid',
        gridTemplateColumns: '2fr 1.5fr 1fr 2fr auto',
        alignItems: 'center',
        p: 2,
        gap: 2,
        border: '2px dashed',
        borderColor: 'grey.400',
        borderRadius: 4,
        cursor: 'pointer',
        transition: 'background-color 0.15s',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      <Typography variant="body1">Add New Task</Typography>

      <Box />
      <Box />
      <Box />

      <IconButton
        onClick={handleClick}
        sx={{
          width: 32,
          height: 32,
          '&:hover': { color: 'gray.600' },
        }}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Card>
  );
}
