import  React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, FormHelperText, Stack } from '@mui/material';
import { validateDate, validMeetingTime } from '../../../utils/validation';
import { socket } from '../../Layout/HomeLayout';
import classes from './meetings.module.css'
import DateSelector from '../../UI/common/DateSelector';

const curr_date = new Date().toISOString().split('T')[0];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
interface Response{
  success:boolean;
  message:string;
}

interface Props{
    open:boolean;
    handleClose:()=>void;
    handleBookMeet:(start:string,end:string,date:string)=>void;
    handleBookSuccess:(message:string)=>void;
}

export default function ReserveModal({open,handleClose,handleBookMeet,handleBookSuccess}:Props) {
    const [startTime,setStartTime] =useState('');
    const [endTime,setEndTime] =useState('');
    const [error,setError] = useState({error:false,message:''});
    const [response,setResponse] = useState<Response | undefined>()
    const [date,setDate] = useState(curr_date);
  
    useEffect(()=>{
      socket.on(`confirm-meet`,(data)=>{
        
        if(data.success){
          handleClose();
          setTimeout(()=>{handleBookSuccess(data.message);},100)
        }
        else{
          setResponse(data);
        }
       
    })
    },[handleBookSuccess,handleClose])
    
    function handleSubmit(){
        if(error.error) return;
        if(!startTime || !endTime) return;
        handleBookMeet(startTime,endTime,date);
    }

    function handleTime(event:React.ChangeEvent<HTMLInputElement>){
      if(response){
        setResponse(undefined);
      }
        const id = event.target.id;
        if(id === 'start'){
            setError(validMeetingTime(event.target.value,endTime));
            setStartTime(event.target.value)
        }
        else{
            setError(validMeetingTime(startTime,event.target.value));
            setEndTime(event.target.value);
        }
        
    }

    function handleDate(value:string){
      if(validateDate(value,'past')){
        setDate(value);
      }
    }
  
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={'center'}>
            Confirm your meeting time
          </Typography>
          <Box className={classes.date_picker}>
            <div>Date : </div>
            <DateSelector date={date} updateDate={handleDate}/>
          </Box>
          <Stack direction={'row'}  gap={3} p={3}>
            <Box className={classes.input}>
                <label htmlFor="start">Start Time</label>
                <input id='start' type='time' value={startTime}  onChange={handleTime}/>
            </Box>
            <Box className={classes.input}>
                <label htmlFor="end">End Time</label>
                <input id='end' type='time' value={endTime}  onChange={handleTime}/>
            </Box>
          </Stack>
          <Box>
            {error.error &&
             <FormHelperText sx={{fontSize:'1rem',textAlign:'center'}} error>{error.message}</FormHelperText>
             }
          </Box>
          {
            response && (
              <Box>
                <FormHelperText sx={{fontSize:'1rem',textAlign:'center'}} error>{response.message}</FormHelperText>
              </Box>
            )
          }
          <Stack direction={'row'} justifyContent={'center'} gap={3} p={3}>
            <Button variant='contained' onClick={handleSubmit}>Confirm</Button>
            <Button variant='contained' onClick={handleClose}>Close</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
