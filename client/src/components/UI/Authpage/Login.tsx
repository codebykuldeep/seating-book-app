import { Box, Button, FormHelperText, TextField } from '@mui/material'
import React, { useState } from 'react'
import { validation } from '../../../utils/validation';
import classes from './login.module.css'
import { apiCall } from '../../../utils/httpMethods';


interface Props{
    nextStep:()=>void;
    email:string;
    handleChange:(event:React.ChangeEvent<HTMLInputElement>)=>void;
}

function Login({nextStep,email,handleChange}:Props) {
    const [submit,setSubmit] = useState(false)
    const [serverError,setServerError] = useState('');
    const [error,setError] = useState({
        isError:false,
        message:'',
    });
    

    async function handleSubmit(event:React.FormEvent<HTMLFormElement>){
        setSubmit(true);
        event.preventDefault()
        const [msg,res] = validation('email',email);
        if(!res){
            const data = await apiCall('POST','login',null,{email});
            if(data.success){
                nextStep();
            }
            else{
                setServerError(data.message);
            }
        }
        else{
            setError({
                isError:res,
                message:msg
            })
        }
        setSubmit(false);
    }

    function handleEmailChange(event:React.ChangeEvent<HTMLInputElement>){
        if(error.isError){
            setError({isError:false,message:''});
        }
        handleChange(event);
    }
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
    
    <Box>
      <TextField
          fullWidth
          placeholder={"Enter your company email"}
          className={classes.input}
          id={'email'}
          name={'email'}
          type={'text'}
          label={'Email'}
          defaultValue={email}
          error={error.isError}
          helperText={error.message}
          onChange={handleEmailChange}
        />
    </Box>
    {
        serverError && (
        <Box>
            <FormHelperText className={classes.error} error>{serverError}</FormHelperText>
        </Box>
        )
    }
    <Box>
        <Button type='submit' variant='contained' loading={submit} loadingPosition='end'>Next</Button>
    </Box>
    </form>
  )
}

export default Login