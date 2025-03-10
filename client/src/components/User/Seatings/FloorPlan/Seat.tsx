import { Tooltip } from '@mui/material'
import React, { useContext } from 'react'
import classes from './floorplan.module.css'
import { ISeat } from '../../../../types/dataTypes'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { socket } from '../../../Layout/HomeLayout';
import { SeatContext } from '../Seatings';

interface Props{
    seat?:ISeat;
}

function Seat({seat}:Props) {
    const {user,bookedSeat} = useSelector((state:RootState)=>state.userSlice);
    const {date,handleUnBookedSeat,removeSelectedSeat} = useContext(SeatContext);
    const {book_status='',employee={name:"dummy"},seat_no=1} = seat!;

    function handleSeatClick(){
        const {emp_id} = user!;
        if(book_status === 'SELECTED' && emp_id === seat?.employee?.emp_id){
            removeSelectedSeat();
            socket.emit('unselect-seat',{date,emp_id})
            return;
        }
        if(bookedSeat) return;

        if(book_status === "BOOKED" || book_status === "SELECTED") return;
        
        
        socket.emit('select-seat',{date,seat_no,emp_id})
        handleUnBookedSeat(seat_no);
    }
  return (
    <Tooltip arrow
                 title={(book_status === 'BOOKED'|| book_status === 'SELECTED') && employee?.name}>
        <button  
            className={classes.seat} value={seat_no} data-state={book_status}
            style={{background:book_status === 'BOOKED' ? 'red': book_status === 'SELECTED' ? 'yellow':"green"}}
            onClick={handleSeatClick}
            >
                    {seat_no}
        </button>
    </Tooltip>
  )
}

export default Seat