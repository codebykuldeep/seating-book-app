import React, { useEffect, useState } from 'react';
import classes from './history.module.css';
import { Box, Stack } from '@mui/material';
import DateSelector from '../../UI/common/DateSelector';
import { socket } from '../../Layout/HomeLayout';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { IMeet, ISeat } from '../../../types/dataTypes';
import MeetingHistory from './ShowMeetings/MeetingHistory';
import SeatingHistory from './ShowSeats/SeatingHistory';

function History() {
    const {emp_id} = useSelector((state:RootState)=>state.userSlice.user)!;
    const [date,setDate] = useState(new Date().toISOString().split('T')[0]);
    const [option,setOption] = useState('seating');
    const [data,setData] = useState<IMeet[] | ISeat[]>([]);

    useEffect(()=>{
        socket.emit('get-history',{option,date,emp_id})

        socket.on('on-history',(data)=>{
            console.log(data);
            setData(data);
            
        })
    },[option,date,emp_id])



    function updateDate(value:string){
        setDate(value);
    }
    function handleOption(event:React.MouseEvent){
        const targetData = event.target as HTMLButtonElement;
        
        if(targetData.nodeName === 'BUTTON'){
            const value = targetData.value;
            if(value === option) return;

            setOption(value);
            setData([]);
        }
        
    }
    console.log(option ," ",date);
    
  return (
    <Box className={classes.container}>
        <Stack direction={'row'} className={classes.header}>
            <div className={classes.option} onClick={handleOption}>
                <div><button value={'seating'}>Seatings</button></div>
                <div><button value={'meeting'}>Meetings history</button></div>
            </div>
            <Box className={classes.date_picker}>
                <DateSelector date={date} updateDate={updateDate} />
            </Box>
        </Stack>
        <Box className={classes.content}>
            {option === 'meeting' && data && <MeetingHistory meetingsData={data as IMeet[]}/>}
            {option === 'seating' && data && <SeatingHistory data={data as ISeat[]}/>}
        </Box>
    </Box>
  )
}

export default History