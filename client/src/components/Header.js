import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useHistory, Link } from 'react-router-dom';

export default function Header() {
  const history = useHistory();

  const handleProfileClick = () => {
    history.push('/profile');
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
        <Box component={Link}
          to="/home"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'transform 0.4s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}>
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
          <AccountCircleIcon sx={{ fontSize: '40px', color: 'grey', mr: '2', transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },}} />
        </IconButton>
      </Toolbar>
    </AppBar>
);
}
