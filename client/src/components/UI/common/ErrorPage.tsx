import { Box, Typography } from '@mui/material';
import React from 'react'
import { useRouteError } from 'react-router-dom';
import classes from './errorpage.module.css';

interface CustomRouteError{
    status?:number;
}

function ErrorPage() {
    const error = useRouteError() as CustomRouteError;
    if(error.status && error.status === 404){
        return (
        <Box className={classes.not_found}>
            <Box>
                <Typography variant='h2' fontWeight={'bold'}>404</Typography>
                <Typography variant='h6'>Not Found, Please revert back to Homepage.</Typography>
            </Box>
        </Box>
        )
    }
  return (
    <div>ErrorPage -{JSON.stringify(error)}</div>
  )
}

export default ErrorPage