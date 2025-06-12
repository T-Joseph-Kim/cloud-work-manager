import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Header() {
  const handleProfileClick = () => {
    // TODO: navigate to profile or open menu
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        width: '100%',
        bgcolor: 'white',
        boxShadow: 6,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src="/images/logo.png"
            alt="Logo"
            sx={{ height: '36px', mr: 2 }}
          />
          <Typography
            variant="h5"
            component="div"
            sx={{ color: 'primary.main' }}
          >
            Enterprise Workcenter
          </Typography>
        </Box>

        <IconButton edge="end" onClick={handleProfileClick}>
          <AccountCircleIcon sx={{ fontSize: '40px', color: 'grey', mr: '2'}} />
        </IconButton>
      </Toolbar>
    </AppBar>
);
}
