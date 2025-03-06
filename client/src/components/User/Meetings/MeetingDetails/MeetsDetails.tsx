import React from 'react'
import ShowTable from './ShowTable'
import { IMeet } from '../../../../types/dataTypes'
import { Box, Typography } from '@mui/material';
import ActiveRoom from './ActiveRoom';
import { getRoomStatus } from '../../../../helper/meetHelperFn';
import ActiveCard from './ActiveCard';

interface Props{
    data:IMeet[];
    meetNo:string | number;
}

function MeetsDetails({meetNo,data}:Props) {
  return (
    <Box p={2}>
      {/* <ActiveRoom data={data} meetNo={meetNo} roomStatus={getRoomStatus(data)}/> */}
      <ActiveCard data={data} meetNo={meetNo} roomState={getRoomStatus(data)}/>
        <Box p={2}>
            <Typography>Today Meeting Schedules</Typography>
            <ShowTable rows={data}/>
        </Box>
    </Box>
  )
}

export default MeetsDetails


