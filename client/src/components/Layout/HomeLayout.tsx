import React, { useEffect, useMemo } from 'react'
import Navbar from './Navbar'
import { io } from 'socket.io-client'
import { CONSTANT } from '../../helper/constants'
import { Outlet } from 'react-router-dom'
import useSnack from '../../helper/useSnack'
import ShowSnackbar from '../UI/common/ShowSnackBar'
import { getToken } from '../../helper/utilityfn';

export let socket = io(CONSTANT.SERVER,{auth:{token:getToken()}});

function HomeLayout() {
  const {snackState,snackOpen,snackClose} = useSnack();
  socket = useMemo(()=>io(CONSTANT.SERVER,{auth:{token:getToken()}}),[])
    useEffect(()=>{
        socket.connect();

        socket.on('error',(error)=>{
          console.log(error);
          
          snackOpen(true,'error','Something went wrong')
        })


        socket.on('connect_error',(err)=>{
          console.log(err);
          snackOpen(true,'error','Something went wrong (connection failed)')
        })

        return ()=>{
            console.log('SOCKET disconnected');
            socket.disconnect();
        }
    },[snackOpen])

  return (
    <>
    <Navbar/>
    <Outlet/>
    <ShowSnackbar state={snackState} closeFn={snackClose}/>
    </>
  )
}

export default HomeLayout