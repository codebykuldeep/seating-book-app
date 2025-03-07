import { Box, Stack } from '@mui/material'
import React from 'react';
import classes from './floorplan.module.css'

const seatArr=[
    {
        color:'green',
        label:"Available"
    },
    {
        color:'yellow',
        label:'Selected'
    },
    {
        color:'red',
        label:'Occupied'
    }
]

function SeatColor() {
  return (
    <Stack gap={2} mx={6}>
        {
            seatArr.map(({color,label})=>(
                <Stack key={label} direction={'row'} gap={1} alignItems={'center'}>
                    <Box className={classes.seat} sx={{background:color}}></Box><Box>{label}</Box>
                </Stack>
            ))
        }
    </Stack>
  )
}

export default SeatColor