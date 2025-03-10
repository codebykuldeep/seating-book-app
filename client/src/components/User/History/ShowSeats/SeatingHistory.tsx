import React from 'react'
import FloorPlanHistory from './FloorPlan/FloorPlan';
import { ISeat } from '../../../../types/dataTypes';
import classes from './seating-history.module.css'
import SeatColor from './FloorPlan/SeatColor';
import { Box, Typography } from '@mui/material';

interface Props{
    data:ISeat[];
}

function SeatingHistory({data}:Props) {
    
  return (
    <Box>
    <Typography variant="h4" sx={{color: '#1976d2' }}>
        Seating History
    </Typography>
    <div className={classes.history}>
        <SeatColor/>
        {data.length > 0 && <FloorPlanHistory data={data}/>}
    </div>
    </Box>
  )
}

export default SeatingHistory
