import React, { useCallback, useEffect, useState } from 'react'
import { socket } from '../../Layout/HomeLayout'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import MeetingsRoom from './MeetingsRoom';
import ReserveModal from './ReserveMeet';
import { Box, Button, Typography } from '@mui/material';
import classes from './meetings.module.css'
import ShowSnackbar from '../../UI/common/ShowSnackBar';
import useSnack from '../../../helper/useSnack';
import MeetsDetails from './MeetingDetails/MeetsDetails';

function Meetings() {
    const [floor] = useState(1);
    const [meetNo,setMeetNo]=useState<string | number>(1);
    const user = useSelector((state:RootState)=>state.userSlice.user);
    const {snackState,snackOpen,snackClose} = useSnack();
    const [meetsData,setMeetsData] = useState([]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = useCallback(() => setOpen(false),[]);

    useEffect(()=>{
        const data={
            floor_no:1,
            meet_no:meetNo,
            emp_id:user?.emp_id,
        }
        socket.emit('init-meet',data)

        socket.on(`get-meet-${floor}-${meetNo}`,(data)=>{
            
            setMeetsData(data);
        })
    },[floor,meetNo,user])


    function handleClick(meet_no:string){
        const data={
            floor_no:1,
            meet_no:meet_no,
            emp_id:user?.emp_id,
        }
        setMeetNo(meet_no);
        socket.emit('init-meet',data)
    }

    function handleBookMeet(start:string,end:string){
        const data={
            floor_no:1,
            meet_no:meetNo,
            emp_id:user?.emp_id,
            start,
            end
        }
        socket.emit('book-meet',data)
    }
    const handleSuccessMeetBook =useCallback(function handleSuccessMeetBook(message:string){
        snackOpen(true,'success',message);
    },[snackOpen])
  return (
    <div>
        {/* <div onClick={handleClick}>get data</div> */}
        <Box className={classes.header}>
            <Typography variant='h5' p={2}>Meeting Rooms</Typography>
            <Box className={classes.reserve_btn}>
            <Button variant='contained' onClick={handleOpen}>Reserve a meet</Button>
        </Box>
        </Box>
        <MeetingsRoom meetNo={meetNo} handleClick={handleClick}/>
        {meetsData && <MeetsDetails data={meetsData} meetNo={meetNo}/>}
        {open && <ReserveModal open={open} handleClose={handleClose} handleBookMeet={handleBookMeet} handleBookSuccess={handleSuccessMeetBook}/>}
        <ShowSnackbar state={snackState} closeFn={snackClose}/>
    </div>
  )
}

export default Meetings