import React from 'react';
import classes from './floorplan.module.css'
import { Box } from '@mui/material';
import Cabin from './FloorComponents/Cabin';
import BigCabin from './FloorComponents/BigCabin';
import BackCabin from './FloorComponents/BackCabin';
import { ISeat } from '../../../../../types/dataTypes';

interface Props{
    data:ISeat[];
}

function FloorPlanHistory({data}:Props) {
    const seat_data ={
        cabin1:data.slice(0,2),
        cabin2:data.slice(2,4),
        big_cabin1:data.slice(4,10),
        big_cabin2:data.slice(10,16),
        back_cabin:data.slice(16),
    }
  return (
    <Box className={classes.container}>
        <Box className={classes.upper_cabin}>
            <Cabin label='First Cabin' seatData={seat_data.cabin1}/>
            <Cabin label='Second Cabin'seatData={seat_data.cabin2}/>
        </Box>
        <Box className={classes.hallway}>
            Hallway
        </Box>
        <Box className={classes.lower_cabin}>
            <BigCabin label={"Cabin 1"} seatData={seat_data.big_cabin1}/>
            <Box className={classes.back_relative}>
                <BigCabin label={"Cabin 2"} seatData={seat_data.big_cabin2}/>
                <BackCabin label='Back Cabin' seatData={seat_data.back_cabin}/>
            </Box>
        </Box>
    </Box>
  )
}

export default FloorPlanHistory