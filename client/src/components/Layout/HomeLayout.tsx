import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { io } from 'socket.io-client'
import { CONSTANT } from '../../helper/constants'
import { Outlet } from 'react-router-dom'
import useSnack from '../../helper/useSnack'
import ShowSnackbar from '../UI/common/ShowSnackBar'
import { getToken } from '../../helper/utilityfn'

export const socket = io(CONSTANT.SERVER,{auth:{token:getToken()}});

function HomeLayout() {
  const {snackState,snackOpen,snackClose} = useSnack();
    useEffect(()=>{
        socket.connect();

        socket.on('error',(error)=>{
          console.log(error);
          
          snackOpen(true,'error','Something went wrong')
        })


        socket.on('connect_error',(err)=>{
          snackOpen(true,'error','Something went wrong')
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