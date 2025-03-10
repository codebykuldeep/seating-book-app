import React, { useEffect, useState } from 'react'
import { IMeet } from '../../../types/dataTypes'
import { socket } from '../../Layout/HomeLayout'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Typography, Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import MeetingCard from './MeetingCard';
import NoMeetings from './NoMeetings';

const curr_date = new Date().toISOString().split('T')[0];

function MyMeetings() {
    const {emp_id} = useSelector((state:RootState)=>state.userSlice.user)!;
    const [data,setData] = useState<IMeet[]>()

    useEffect(()=>{
        socket.emit('my-meets',{emp_id,date:curr_date});

        socket.on('meets-data',(data)=>{
            console.log('user meet',data);
            setData(data);
        })
    },[emp_id])
    
  return (
    <Box p={2}>
        <Typography variant='h5' my={3}>Meetings Schedule</Typography>
        <Grid container spacing={3}>
        {data && data.length > 0 && data.map((meeting) => (
            <Grid size={{xs:12,sm:6 ,md:4}} key={meeting.meet_id}>
                <MeetingCard meeting={meeting} date={curr_date}/>
            </Grid>
        ))}
        {data && data.length ===0 && (<NoMeetings type='CURRENT'/>)}
        </Grid>
    </Box>
  )
}

export default MyMeetings