import { Box } from '@mui/material'
import React from 'react';
import classes from './backcabin.module.css'
import Seat from '../Seat';
import { ISeat } from '../../../../../types/dataTypes';


interface Props{
        label:string;
        seatData:ISeat[]
}

function BackCabin({label,seatData}:Props) {
        let index =0;
  return (
    <Box className={classes.back_cabin}>
        <Box className={classes.seat_pair}>
                <Seat seat={seatData[index++]}/>
                <Seat seat={seatData[index++]}/>  
        </Box>
        <Box className={classes.seat_pair}>
                <Seat seat={seatData[index++]}/>
                <Seat seat={seatData[index++]}/>  
        </Box>
        <Box className={classes.seat_pair}>
                <Seat seat={seatData[index++]}/>
                <Seat seat={seatData[index++]}/>  
        </Box>
        <Box className={classes.label}>
            {label}
        </Box>
        <Box className={classes.back_open}>  
        </Box>
    </Box>
  )
}

export default BackCabin