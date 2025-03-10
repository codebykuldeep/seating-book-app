import  React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ColumnType, IMeet, IUser } from '../../../../types/dataTypes';
import { getDuration } from '../../../../helper/meetHelperFn';
import { Typography } from '@mui/material';





interface DataTableProps<T>{
  columns?:ColumnType[],
  rows:T[],
  openModal?:(row:T)=>void;
}

export default function ShowTable<T>({columns=COLUMN,rows,openModal}:DataTableProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleRow(row:any){
    if(openModal){
      openModal(row);
    }
  }


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440,width:'100%', }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
              
                >
                  <Typography variant="subtitle1" fontWeight="bold"> {column.label}</Typography>
                  
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,ind) => {
                return (
                  <TableRow
                   hover role="checkbox" tabIndex={-1} key={ind}
                   sx={{
                    '&:hover': { backgroundColor: '#fafafa' },
                    transition: 'background-color 0.2s'
                  }}
                  onClick={()=>handleRow(row)}>
                    {columns.map((column) => {
                      const value = row[column.id as keyof T] as string;
                      return (
                        <TableCell key={column.id} id={column.id} align={column.align}>
                          {column.id === 'duration' ? getDuration(row as IMeet):column.format
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};






const COLUMN:ColumnType[] =[
  {
     id:'booked_by',
     label:'Name',
     align:'center',
     format:(value:unknown)=>{
      if(value){
          return (value as IUser).name
      }
      return 'NA';
     }

  },
  {
      id:'start_time',
      label:'Start Time',
      align:'center',
  },
  {
      id:'end_time',
      label:'End Time',
      align:'center',
  },
  {
      id:'duration',
      label:'Duration',
      align:'center',
  }
]