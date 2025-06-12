import { Box, Paper } from '@mui/material';

export default function LoginContainer({ children }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #90caf9 100%)',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 6,
          maxWidth: 450,
          width: '100%',
          textAlign: 'center',
          borderRadius: 10,
          minHeight: '350px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}
