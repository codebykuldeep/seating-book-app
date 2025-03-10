import React, { useState } from 'react';
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
  TablePagination,
} from '@mui/material';
import { IMeet } from '../../../../types/dataTypes';
import NoMeetings from '../../MyMeetings/NoMeetings';

interface Props{
    meetingsData:IMeet[];
    date:string;
}
const MeetingHistory = ({meetingsData,date}:Props) => {
  const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

  const formatTime = (time:string) => {
    return new Date(`2025-03-06 ${time}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  if(meetingsData.length === 0)
    return <NoMeetings type='HISTORY' date={date}/>

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
            {meetingsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((meeting) => (
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={meetingsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default MeetingHistory;