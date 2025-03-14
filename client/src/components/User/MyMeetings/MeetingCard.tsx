import React from "react";
import { Card, CardContent, Typography, IconButton, Box, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import RoomIcon from "@mui/icons-material/Room";
import PersonIcon from "@mui/icons-material/Person";
import { IMeet } from "../../../types/dataTypes";
import { dateFormatter } from "../../../utils/dateUtils";
import { socket } from "../../Layout/HomeLayout";


interface Props {
  meeting: IMeet;
  onDelete?: (meet_id: number) => void;
  date:string;
}

const MeetingCard = ({ meeting ,date}:Props) => {
    const {meet_id,booked_by:{emp_id},meet_no} = meeting;
    const room = Number(meet_no) === 1 ? 'Left Room' : "Right Room";
    function handleDelete(){
        socket.emit('delete-meet',{meet_id,emp_id,date});
    }
  return (
    <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <Typography variant="h6" fontWeight="bold">
                Meeting - {dateFormatter(meeting.date)}
              </Typography>
              <Box textAlign="right">
                <IconButton onClick={handleDelete} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
              </Box>

              <Box display="flex" alignItems="center" mt={1} gap={1}>
                <EventIcon fontSize="small" color="primary" />
                <Typography variant="body1">{meeting.date}</Typography>
              </Box>

              <Box display="flex" alignItems="center" mt={1} gap={1}>
                <AccessTimeIcon fontSize="small" color="secondary" />
                <Typography variant="body1">
                  {meeting.start_time} - {meeting.end_time}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" mt={1} gap={1}>
                <RoomIcon fontSize="small" color="error" />
                <Typography variant="body1">Floor {meeting.floor_no} - {room}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" alignItems="center" gap={1}>
                <PersonIcon fontSize="small" color="success" />
                <Typography variant="body2">
                  {meeting.booked_by.name} ({meeting.booked_by.email})
                </Typography>
              </Box>
            </CardContent>
          </Card>
  );
};

export default MeetingCard;
