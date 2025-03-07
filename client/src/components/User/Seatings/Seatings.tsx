import React, { createContext, useCallback, useEffect, useRef, useState } from 'react'
import { socket } from '../../Layout/HomeLayout';
import { ISeat } from '../../../types/dataTypes';
import FloorPlan from './FloorPlan/FloorPlan';
import classes from './seatings.module.css';
import SeatColor from './FloorPlan/SeatColor';
import { Box, Button, Typography } from '@mui/material';
import ConfirmModal from './ConfirmModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

export const SeatContext = createContext({
  handleUnBookedSeat:()=>{},
})

function Seatings() {
    const emp_id = useSelector((state:RootState)=>state.userSlice.user?.emp_id)
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const [seats,setSeats] = useState<ISeat[]>();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(()=>{
        console.log('getting data');
        
        socket.emit('init-data');


        socket.on('get-data',(data)=>{
            setSeats(data);
        })
    },[])

    function handleConfirm(){
      socket.emit('book-seat');
      clearTimeout(timer.current!);
    }
    const handleUnBookedSeat= useCallback(()=>{
      timer.current = setTimeout(()=>{
        socket.emit('unselect-seat',{emp_id})
      },1000 * 60 * 5 )
    },[emp_id])

    return(
      <SeatContext.Provider value={{handleUnBookedSeat}}>
        <Box>
        <Box className={classes.header}>
          <Typography>Seating plan for Dev's Floor</Typography>
          <div className={classes.confirm_btn}>
            <Button variant='contained' onClick={handleOpen}>Confirm Seat</Button>
          </div>
        </Box>
        <div className={classes.container}>
            <SeatColor/>
            {seats && <FloorPlan data={seats!}/>}
        </div>
     </Box>
     {open && <ConfirmModal open={open} handleClose={handleClose} handleConfirm={handleConfirm}/>}
      </SeatContext.Provider>
    )
}

export default Seatings