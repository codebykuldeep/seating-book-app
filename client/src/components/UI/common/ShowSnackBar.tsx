import  React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface Props{
    state:{
        open:boolean;
        status:'success' | 'info' | 'warning' | 'error' | undefined;
        message:string;
    };
    closeFn:()=>void;
}

export default function ShowSnackbar({state,closeFn}:Props) {
  const {open,message,status} = state;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

   closeFn();
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{vertical:'top',horizontal:'right'}}
       open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={status}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}