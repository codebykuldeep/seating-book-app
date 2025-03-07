import React from 'react'
import { socket } from '../Layout/HomeLayout'



function Home() {
    function sendMsg(){
        
        socket.emit('message',{message:'hello server'})
        
    }
  return (
    <>
    <button onClick={sendMsg}>Send</button>
    </>
  )
}

export default Home