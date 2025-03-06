import  React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, Stack } from '@mui/material';

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

interface Props{
    open:boolean;
    handleClose:()=>void;
    handleConfirm:()=>void;
}

export default function ConfirmModal({open,handleClose,handleConfirm}:Props) {

    function handleSubmit(){
        handleConfirm();
        handleClose();
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
            Confirm your seat
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <Stack direction={'row'} justifyContent={'center'} gap={3} p={3}>
            <Button variant='contained' onClick={handleSubmit}>Confirm</Button>
            <Button variant='contained' onClick={handleClose}>Close</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
