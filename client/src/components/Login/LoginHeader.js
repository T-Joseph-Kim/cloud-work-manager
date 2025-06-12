import React from 'react';
import { Box, Typography } from '@mui/material';

export default function LoginHeader() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 1,
      }}
    >
      <Box
        component="img"
        src="/images/logo.png"
        alt="Logo"
        sx={{ height: 50, mr: 2, mb: 1 }}
      />
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ color: 'primary.main' }}
      >
        Enterprise Workcenter
      </Typography>
    </Box>
  );
}
