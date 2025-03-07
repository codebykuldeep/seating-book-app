import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'

interface Props{
  time:number;
  update:()=>void;
}
function RoomTimer({time,update}:Props) {
  const [min,setMin] = useState(Math.ceil((time/1000)/60))
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function updateTime(){
    setMin(prev=>prev-1);
  }
  
  // useEffect(()=>{
  //   if(min <=0){
  //     update();
  //   }
  //   clearTimeout(timer.current!)
  //   timer.current=setTimeout(()=>{
  //     updateTime();
  //   },1000)

  //   return ()=>{
  //     clearTimeout(timer.current!);
  //   }
  // },[min])

  return (
    <Box>
      <Typography variant='body2'>Meeting end in <strong>{min}</strong> mins</Typography>
    </Box>
  )
}

export default RoomTimer