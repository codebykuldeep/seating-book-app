import { Button } from '@mui/material';
import React from 'react';
import RemoveIcon from '@mui/icons-material/DoDisturbAlt';
import { socket } from '../../../Layout/HomeLayout';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { userActions } from '../../../../store/userSlice';

interface Props{
    date:string;
    emp_id:string;
}

function RemoveSeat({date,emp_id}:Props) {
    const dispatch = useDispatch<AppDispatch>();
    function handleSeatRemove(){
       socket.emit('remove-seat',{date,emp_id});
       dispatch(userActions.removeBothSeat());
    }
  return (
    <div>
        <Button variant='contained' endIcon={<RemoveIcon/>} onClick={handleSeatRemove}>
            Remove Seat
        </Button>
    </div>
  )
}

export default RemoveSeat