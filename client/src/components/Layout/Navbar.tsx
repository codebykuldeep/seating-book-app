import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken } from '../../helper/utilityfn';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
  const navigate = useNavigate();
  function handleLogout(){
    removeToken();
    navigate('/login');
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} p={1}>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={'/seatings'}>Seatings</Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={'/meetings'}>Meetings</Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={'/history'}>History</Link>
          </Typography>
          </Stack>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Stack>
      </AppBar>
    </Box>
  );
}
