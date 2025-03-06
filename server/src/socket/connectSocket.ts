import { Socket } from "socket.io";
import { io } from "../app";
import { bookSeat, getSeatData, releaseSelectedSeat, selectedSeat, unselectSeat } from "../controllers/seats";
import { Employees } from "../lib/entitites/employees";
import { bookMeeting, getAllMeetings } from "../controllers/meets";
import { BookMeetSocket } from "../types/types";

const socketToEmployee = new Map();

async function connectSocketIo(socket:Socket){
    console.log(socket.id);
    console.log('USER CONNECTED');

    //SEATING SOCKETS

    socket.on('init-data',async()=>{
        const seats = await getSeatData();
        io.emit('get-data',seats);
    })


    socket.on('select-seat',async({seat_no,emp_id}:{seat_no:string,emp_id:string})=>{
        if(!socketToEmployee.get(socket.id)){
            const employee = await Employees.findOne({where:{emp_id:Number(emp_id)}});
            socketToEmployee.set(socket.id,employee);
        }
        const employee =  socketToEmployee.get(socket.id);
        
        await selectedSeat(seat_no,employee);
        const seats = await getSeatData();
        io.emit('get-data',seats);
    })

    socket.on('unselect-seat',async({emp_id}:{seat_no:string,emp_id:string})=>{
        if(!socketToEmployee.get(socket.id)){
            const employee = await Employees.findOne({where:{emp_id:Number(emp_id)}});
            socketToEmployee.set(socket.id,employee);
        }
        const employee =  socketToEmployee.get(socket.id);
        
        await unselectSeat(employee);
        const seats = await getSeatData();
        io.emit('get-data',seats);
    })

    socket.on('book-seat',async()=>{
        const employee = socketToEmployee.get(socket.id);
        //console.log(employee);
        
        await bookSeat(employee);
        const seats = await getSeatData();
        io.emit('get-data',seats);
    })
    

    socket.on('message',({message}:{message:string})=>{
        
        console.log('message : '  + message);
        // socket.to(room).emit("receive", message);
        io.emit('response','i got msg !');
    })


    //MEETINGS SOCKET
    //
    socket.on('init-meet',async({floor_no,meet_no,emp_id}:{floor_no:string;meet_no:string,emp_id:string})=>{
        if(!socketToEmployee.get(socket.id)){
            const employee = await Employees.findOne({where:{emp_id:Number(emp_id)}});
            socketToEmployee.set(socket.id,employee);
        }
        
        const data = await getAllMeetings(floor_no,meet_no);
        io.emit(`get-meet-${floor_no}-${meet_no}`,data)
    })

    socket.on('book-meet',async(data:BookMeetSocket)=>{
        const {emp_id,floor_no,meet_no,start,end} = data;
        if(!socketToEmployee.get(socket.id)){
            const employee = await Employees.findOne({where:{emp_id:Number(emp_id)}});
            socketToEmployee.set(socket.id,employee);
        }
        const employee =  socketToEmployee.get(socket.id);
        const result = await bookMeeting(employee,start,end,floor_no,meet_no);
        if(result.success){
            socket.emit('confirm-meet',result);
            const allMeetings = await getAllMeetings(floor_no,meet_no);
            io.emit(`get-meet-${floor_no}-${meet_no}`,allMeetings);
        }
        else{
            socket.emit('confirm-meet',result);
        }
        
    })

   
    socket.on('disconnect',async()=>{
        console.log('disconnected - '  + socket.id);
        console.log('disconnect emp_id -> ',socketToEmployee.get(socket.id));

        try {
            await releaseSelectedSeat(socketToEmployee.get(socket.id))
            socketToEmployee.delete(socket.id);
        } catch (error) {
            console.log(error);
        }

        const seats = await getSeatData();
        io.emit('get-data',seats);
    })
    
}


export default connectSocketIo;