import { Box, Stack } from '@mui/material'
import React from 'react';
import classes from './bigcabin.module.css';
import Seat from '../Seat';
import { ISeat } from '../../../../../../types/dataTypes';



interface Props{
    label:string;
    seatData:ISeat[]
}

function BigCabin({label,seatData}:Props) {
  return (
    <Stack className={classes.big_cabin}>
        <Box className={classes.upper_space}>
            <Box className={classes.seat_box}>
                <Seat seat={seatData[0]}/>
                <Seat seat={seatData[1]}/>  
            </Box>
        </Box>
        <Box className={classes.inner_space}>
            <Box className={classes.seat_box}>
                <Seat seat={seatData[2]}/>
                <Seat seat={seatData[3]}/>   
            </Box>
            <Box className={classes.seat_box}>
                <Seat seat={seatData[4]}/>
                <Seat seat={seatData[5]}/>   
            </Box>


            <Box className={classes.inner_label}>
                {label}
            </Box>
            <Box className={classes.inner_open}>
            </Box>
        </Box>
    </Stack>
  )
}

export default BigCabin