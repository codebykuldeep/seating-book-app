import { Box, Typography } from '@mui/material'
import React, { useState } from 'react';
import classes from './activeroom.module.css';
import { IMeet } from '../../../../types/dataTypes';
import { MeetRoomState } from '../../../../types/meetingsTypes';



interface Props{
    data:IMeet[];
    meetNo:string | number;
    roomState:MeetRoomState | null;
}

function ActiveCard({meetNo,data,roomState}:Props) {
    const [state] = useState(true);
  const RoomName = Number(meetNo) === 1 ? "Left Room" : "Right Room";
  console.log(roomState);
  
  
  
  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography variant='h6'>{RoomName}</Typography>
        <Typography variant='body2' className={`${classes.status} ${roomState ? classes.busy : classes.free}`}>
          {state && roomState ? "Occupied" : 'Free'}
        </Typography>
      </Box>
      {
        state && roomState && (
            <Box>
                <Typography variant='body2'>Name : {roomState.state.booked_by.name}</Typography>
                <Typography variant='body2'>Email : {roomState.state.booked_by.email}</Typography>
                <Typography variant='body2'>Start time : {roomState.state.start_time}</Typography>
                <Typography variant='body2'>End Time : {roomState.state.end_time}</Typography>
            </Box>
        )
      }
      {/* {state && roomState && <RoomTimer } */}
    </Box>
  )
}

export default ActiveCard;