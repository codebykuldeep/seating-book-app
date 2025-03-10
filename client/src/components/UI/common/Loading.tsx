import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import classes from './main.module.css'

export default function Loading() {
  return (
    <Box className={classes.loader}>
      <CircularProgress size={50}/>
    </Box>
  );
}
