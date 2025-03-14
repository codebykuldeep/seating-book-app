import React from 'react';
import classes from './cabin.module.css';
import { Box } from '@mui/material';
import Seat from '../Seat';
import { ISeat } from '../../../../../types/dataTypes';

interface Props{
    label:string;
    seatData:ISeat[]
}

function Cabin({label,seatData}:Props) {
  return (
    <Box className={`${classes.cabin} cabin-box`}>
        <Box className={classes.content}>
            <Seat seat={seatData[0]}/>
            <Box className={classes.table}>table</Box>
            <Seat seat={seatData[1]}/>
        </Box>
        <Box className={classes.cabin_label}>
        {label}
        </Box>
        <Box className={classes.cabin_open}>
        </Box>
    </Box>
  )
}

export default Cabin