import { Tooltip } from '@mui/material'
import React, { useState } from 'react'
import classes from './floorplan.module.css'
import { ISeat } from '../../../../../types/dataTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';


interface Props{
    seat?:ISeat;
}

function Seat({seat}:Props) {
    const user = useSelector((state:RootState)=>state.userSlice.user)!;
    const {book_status='',employee={name:"dummy",emp_id:-1},seat_no=1} = seat!;
    const [showTip,setShowTip] = useState(false);

  return (
    <Tooltip arrow open={showTip || (book_status === 'BOOKED' && employee?.emp_id === user.emp_id)}
    onMouseEnter={()=>setShowTip(true)}
    onMouseOut={()=>setShowTip(false)}
                 title={book_status === 'BOOKED' && employee?.name}>
        <button  
            className={classes.seat} value={seat_no} data-state={book_status}
            style={{background:book_status === 'BOOKED' ? 'red': book_status === 'SELECTED' ? 'yellow':"green"}}>
                    {seat_no}
        </button>
    </Tooltip>
  )
}

export default Seat