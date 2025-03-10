import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { removeToken } from '../../helper/utilityfn';
import classes from './navbar.module.css';

const LinkArr =[
  {
    link:'/seatings',
    label:'Book your seat'
  },
  {
    link:'/meetings',
    label:'Meetings'
  },
  {
    link:'/my-meets',
    label:'My Meetings'
  },
  {
    link:'/history',
    label:'History'
  }
]

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
            
          {
            LinkArr.map(({link,label})=>(
              <Typography key={link} variant="h6" component="div" sx={{ flexGrow: 1,fontSize:'18px' }}>
                <NavLink className={({isActive})=>isActive ? classes.active : ''} to={link}>{label}</NavLink>
              </Typography>
            ))
          }
        
          </Stack>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Stack>
      </AppBar>
    </Box>
  );
}
