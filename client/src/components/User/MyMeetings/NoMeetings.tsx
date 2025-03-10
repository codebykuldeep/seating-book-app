import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import EventBusyIcon from "@mui/icons-material/EventBusy"; 
import classes from './my-meeting.module.css'
import { dateFormatter } from "../../../utils/dateUtils";

interface Props{
  date?:string;
  type:"HISTORY" | "CURRENT";
}

function NoMeetings({type,date}:Props) {
  return (
    <Stack className={classes.no_meet}>
        <Box className={classes.no_meet_content}>
            <EventBusyIcon sx={{ fontSize: 60, color: "gray" }} />
            <Typography variant="h6" color="textSecondary" sx={{ marginTop: 1 }}>
           {type ==='CURRENT' ? 'No Meetings Scheduled' : 'No Meetings History found'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
            {type === 'CURRENT' ? 
            <>
            You don’t have any scheduled meetings. Book one now!
            </>:
            <>
            You don’t have any scheduled meetings on {(date && dateFormatter(date)) || ''};
            </>}
            </Typography>
        </Box>
    </Stack>
  );
}

export default NoMeetings;
