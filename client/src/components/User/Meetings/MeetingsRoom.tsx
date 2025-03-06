import { Box } from '@mui/material'
import React from 'react';
import classes from './meetings-room.module.css'

const meetingRoomArr =[
    {
        meet_no:1,
        name:'Left Room'
    },
    {
        meet_no:2,
        name:"Right Room"
    }
]

interface Props{
    meetNo:number | string;
    handleClick:(meet_no:string)=>void;
}

function MeetingsRoom({meetNo,handleClick}:Props) {

    function handleRoomSelect(event:React.MouseEvent){
        const targetData = event.target as HTMLButtonElement;
        if(!targetData.dataset.meetNo) return;
        const meet_no = targetData.dataset.meetNo;
        handleClick(meet_no);
    }
  return (
    <Box>
        
        <div className={classes.room_container} onClick={handleRoomSelect}>
        {
            meetingRoomArr.map(({meet_no,name})=>(
                <div key={meet_no} data-meet-no={meet_no}
                 className={`${classes.room} ${Number(meetNo) === Number(meet_no) ? classes.selected : ''}`}>
                    {name}
                </div>
            ))
        }
        </div>
    </Box>
  )
}

export default MeetingsRoom