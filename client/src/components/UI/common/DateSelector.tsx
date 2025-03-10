import React from 'react';
import { Box } from '@mui/material';
import classes from './main.module.css';


interface Props{
    date:string;
    updateDate:(val:string)=>void;
}

export default function DateSelector({date,updateDate}:Props) {

    function handleDate(event:React.ChangeEvent<HTMLInputElement>){      
        const date = event.target.value;
        if(!date) return;
        
        updateDate(date)   
    }
  return (
    <Box className={classes.picker}>
      <input type='date' onChange={handleDate} value={date}/>
    </Box>
  );
}
