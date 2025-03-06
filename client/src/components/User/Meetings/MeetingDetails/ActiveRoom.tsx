import { Box, Typography } from '@mui/material'
import React, { useState } from 'react';
import classes from './activeroom.module.css';
import { IMeet } from '../../../../types/dataTypes';
import { getRoomStatus } from '../../../../helper/meetHelperFn';
import { MeetRoomState } from '../../../../types/meetingsTypes';
import RoomTimer from './RoomTimer';


interface Props{
    data:IMeet[];
    meetNo:string | number;
    roomStatus:MeetRoomState | null;
}

function ActiveRoom({meetNo,data,roomStatus}:Props) {
  console.log(data.length);
  console.log(roomStatus);
  
  
  const RoomName = Number(meetNo) === 1 ? "Left Room" : "Right Room";
  const [roomState,setRoomState] =useState<MeetRoomState | null>(roomStatus)
  const [showTimer,setShowTimer] = useState(roomStatus ? true : false);
  
  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography variant='h6'>{RoomName}</Typography>
        <Typography variant='body2' className={`${classes.status} ${roomState ? classes.busy : classes.free}`}>
          {roomState ? "Occupied" : 'Free'}
        </Typography>
      </Box>
      <Box>
        {JSON.stringify(roomState)}
      </Box>
      {/* {showTimer && <RoomTimer/>} */}
    </Box>
  )
}

export default ActiveRoom;