import React, { createContext, useCallback, useEffect, useRef, useState } from 'react'
import { socket } from '../../Layout/HomeLayout';
import { ISeat } from '../../../types/dataTypes';
import FloorPlan from './FloorPlan/FloorPlan';
import classes from './seatings.module.css';
import SeatColor from './FloorPlan/SeatColor';
import { Box, Button, Typography } from '@mui/material';
import ConfirmModal from './ConfirmModal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { userActions } from '../../../store/userSlice';
import DateSelector from '../../UI/common/DateSelector';
import { validateDate } from '../../../utils/validation';
import { getUserSeatWithStatus } from '../../../helper/utilityfn';
import RemoveSeat from './RemoveSeatBook/RemoveSeat';
import { dateFormatter } from '../../../utils/dateUtils';
import ShowSnackbar from '../../UI/common/ShowSnackBar';
import useSnack from '../../../helper/useSnack';
import Loading from '../../UI/common/Loading';

const curr_date = new Date().toISOString().split('T')[0];

export const SeatContext = createContext({
  date:curr_date,
  handleUnBookedSeat:(val:string|number)=>{},
  removeSelectedSeat:()=>{},
})

function Seatings() {
    const {selectedSeat,bookedSeat,user} = useSelector((state:RootState)=>state.userSlice)!
    const [date,setDate] = useState(curr_date);
    const dispatch = useDispatch<AppDispatch>()
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const [seats,setSeats] = useState<ISeat[]>();
    const [open, setOpen] = useState(false);
    const {snackState,snackOpen,snackClose} = useSnack();



    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const {emp_id} = user!;

    useEffect(()=>{
        
        socket.emit('init-data',{date});


        socket.on(`get-data-${date}`,(data)=>{
            if(data && data.length > 0){
              const [seat,status] = getUserSeatWithStatus(data,emp_id);
              
              if(seat !== -1){
                if(status === "BOOKED"){
                  dispatch(userActions.setBookedSeat(seat));
                }
                else if(status === "SELECTED"){
                  dispatch(userActions.setSelectedSeat(seat));
                }
              }
              else{
                dispatch(userActions.removeBothSeat())
              }
            } 
            
            setSeats(data);
        })
    },[date,emp_id,dispatch])

    function updateDate(value:string){
      if(validateDate(value,'past')){
        if(snackState.open) snackClose();
        
        setDate(value);
      }
      else{
        snackOpen(true,'warning','Invalid selection: Please choose today or a future date.')
      }
    }

    function handleConfirm(){
      socket.emit('book-seat',{emp_id,date});
      clearTimeout(timer.current!);
      removeSelectedSeat();
    }

    function removeSelectedSeat(){
      dispatch(userActions.removeSelectedSeat())
    }


    const handleUnBookedSeat= useCallback((seat_no:string|number)=>{
      dispatch(userActions.setSelectedSeat(seat_no));

      timer.current = setTimeout(()=>{
        dispatch(userActions.removeSelectedSeat())
        socket.emit('unselect-seat',{date,emp_id})
      },1000 * 60 * 5 )
    },[emp_id,dispatch,date])
    
    
    return(
      <SeatContext.Provider value={{date,handleUnBookedSeat,removeSelectedSeat}}>
        <Box>
        <Box className={classes.header}>
          <Typography variant='h6'>Choose your seat for {dateFormatter(date)}</Typography>
          <Box className={classes.btn_box}>
          {
            !bookedSeat && selectedSeat && (
              <div >
                <Button variant='contained' onClick={handleOpen}>Confirm Seat</Button>
              </div>
            )
            
          }
          {
            bookedSeat && !selectedSeat && (
              <RemoveSeat date={date} emp_id={emp_id}/>
            )
            
          }
          <Box>
          <DateSelector date={date} updateDate={updateDate}/>
          </Box>
          </Box>
        </Box>
        {
          seats && (
            <div className={classes.container}>
              <SeatColor/>
              <FloorPlan data={seats!}/>
            </div>
          )
        }
        {!seats && <Loading/>}
     </Box>
     {open && <ConfirmModal open={open} handleClose={handleClose} handleConfirm={handleConfirm}/>}
     <ShowSnackbar state={snackState} closeFn={snackClose}/>
      </SeatContext.Provider>
    )
}

export default Seatings