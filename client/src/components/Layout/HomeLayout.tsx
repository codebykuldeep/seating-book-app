import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { io } from 'socket.io-client'
import { CONSTANT } from '../../helper/constants'
import { Outlet } from 'react-router-dom'

export const socket = io(CONSTANT.SERVER);

function HomeLayout() {
    useEffect(()=>{
        socket.connect();

        socket.on('response',(data)=>{
            console.log('socket data -> ',data);
            
        })

        return ()=>{
            console.log('SOCKET disconnected');
            socket.disconnect();
        }
    },[])
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default HomeLayout