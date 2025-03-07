import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { IMeet } from '../../../../types/dataTypes';

interface Props{
    meetingsData:IMeet[];
}
const MeetingHistory = ({meetingsData}:Props) => {

  const formatTime = (time:string) => {
    return new Date(`2025-03-06 ${time}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Box >
      <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#1976d2' }}>
        Meeting History
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-label="meeting history table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">Meeting ID</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">Room No</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">Floor</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">Time Slot</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">Booked By</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">Email</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meetingsData.map((meeting) => (
              <TableRow
                key={meeting.meet_id}
                sx={{
                  '&:hover': { backgroundColor: '#fafafa' },
                  transition: 'background-color 0.2s'
                }}
              >
                <TableCell>{meeting.meet_id}</TableCell>
                <TableCell>{meeting.meet_no}</TableCell>
                <TableCell>{meeting.floor_no}</TableCell>
                <TableCell>
                  {formatTime(meeting.start_time)} - {formatTime(meeting.end_time)}
                </TableCell>
                <TableCell>{meeting.booked_by.name}</TableCell>
                <TableCell>{meeting.booked_by.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MeetingHistory;