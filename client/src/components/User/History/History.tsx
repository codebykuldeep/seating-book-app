import React, { useEffect, useState } from 'react';
import classes from './history.module.css';
import { Box, Stack, Typography } from '@mui/material';
import DateSelector from './DateSelector';
import { socket } from '../../Layout/HomeLayout';

function History() {
    const [date,setDate] = useState(new Date().toISOString().split('T')[0]);
    const [option,setOption] = useState('seating');

    useEffect(()=>{
        socket.emit('get-history',{option,date})
    },[option,date])



    function updateDate(value:string){
        setDate(value);
    }
    function handleOption(event:React.MouseEvent){
        const targetData = event.target as HTMLButtonElement;
        
        if(targetData.nodeName === 'BUTTON'){
            const value = targetData.value;
            if(value === option) return;

            setOption(value);
        }
        
    }
    console.log(option);
    
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
            content
        </Box>
    </Box>
  )
}

export default History