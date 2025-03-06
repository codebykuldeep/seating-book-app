import React, { useState } from 'react';
import classes from './seating-plan.module.css';
import { ISeat } from '../../../types/dataTypes'
import { socket } from '../../Layout/HomeLayout';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Button, Tooltip } from '@mui/material';
import ConfirmModal from './ConfirmModal';

interface Props{
    data:ISeat[];
}

function SeatingPlan({data}:Props) {
    const user = useSelector((state:RootState)=>state.userSlice.user);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
 

    function handleSeatClick(event:React.SyntheticEvent){
        const targetData = event.target as HTMLButtonElement;
        const seat_no = targetData.value;
        const seat_state = targetData.dataset.state;
        if(seat_state === "BOOKED" || seat_state === "SELECTED") return;
        
        const {emp_id} = user!;
        socket.emit('select-seat',{seat_no,emp_id})
    }

    function handleConfirm(){
        socket.emit('book-seat');
    }
  return (
    <>
    <div className={classes.confirm_btn}>
        <Button variant='contained' onClick={handleOpen}>Confirm Seat</Button>
    </div>
    <div className={classes.seat_container} onClick={handleSeatClick}>
        {
            data && data.map(({seat_no,book_status,employee})=>(
                <Tooltip key={seat_no} arrow
                 title={(book_status === 'BOOKED'|| book_status === 'SELECTED') && employee?.name}>
                    <button  
                        className={classes.seat} value={seat_no} data-state={book_status}
                        style={{background:book_status === 'BOOKED' ? 'red': book_status === 'SELECTED' ? 'yellow':"green"}}>
                            {seat_no}
                    </button>
                </Tooltip>
            ))
        }
    </div>
    {open && <ConfirmModal open={open} handleClose={handleClose} handleConfirm={handleConfirm}/>}
    </>
  )
}

export default SeatingPlan