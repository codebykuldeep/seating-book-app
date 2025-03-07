import React, { useState } from 'react'
import Login from './Login';
import classes from './authpage.module.css'
import { Box, Stack } from '@mui/material';
import Logo from '../../../assets/logo.png'
import OtpVerify from './OtpVerify';

function Authpage() {
  const [email,setEmail] =useState('');
  const [step,setStep] = useState(1);

  function handleChange(event:React.ChangeEvent<HTMLInputElement>){
    const value = event.target.value;
    setEmail(value);
  }

  function nextStep(){
    setStep(prev=>prev+1);
  }
  return (
    <Stack className={classes.container}>
      <Box className={classes.form}>
    <Box className={classes.img}>
        <img src={Logo} alt="logo" />
    </Box>
    {step === 1 && <Login nextStep={nextStep} email={email} handleChange={handleChange}/>}
    {step === 2 && <OtpVerify email={email}/>}
    </Box>
    </Stack>
  )
}

export default Authpage