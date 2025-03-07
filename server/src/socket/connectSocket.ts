import { Socket } from "socket.io";
import { io } from "../app";
import { bookSeat, getSeatData, releaseAllselectedSeat, removeSeat, selectedSeat, unselectSeat } from "../controllers/seats";
import { Employees } from "../lib/entitites/employees";
import { bookMeeting, getAllMeetings, getMeetingHistory } from "../controllers/meets";
import { BookMeetSocket, GetHistorySocket } from "../types/types";
import { MeetsLog } from "../lib/entitites/meetLog";
import { getSeatingsHistory } from "../controllers/seatsLog";
import { BookSeatSocket, InitMeetSocket, InitSeatSocket, SelectSeatSocket, UnSelectSeatSocket } from "../types/socketTypes";

const socketToEmployee = new Map();


async function mapSocketIdToEmployee(id:string,emp_id:string){
    if(!socketToEmployee.get(id)){
        const employee = await Employees.findOne({where:{emp_id:Number(emp_id)}});
        socketToEmployee.set(id,employee);
    }
}

async function connectSocketIo(socket:Socket){
    console.log(socket.id);
    console.log('USER CONNECTED');

    //SEATING SOCKETS
    socket.on('init-data',async({date}:InitSeatSocket)=>{
        const seats = await getSeatData(date);
        
        io.emit(`get-data-${date}`,seats);
    })


    socket.on('select-seat',async({date,seat_no,emp_id}:SelectSeatSocket)=>{
        await mapSocketIdToEmployee(socket.id,emp_id);

        const employee =  socketToEmployee.get(socket.id);
        
        await selectedSeat(seat_no,employee,date);
        const seats = await getSeatData(date);
        io.emit(`get-data-${date}`,seats);
    })

    socket.on('unselect-seat',async({date,emp_id}:UnSelectSeatSocket)=>{
        await mapSocketIdToEmployee(socket.id,emp_id);

        const employee =  socketToEmployee.get(socket.id);
        
        await unselectSeat(employee,date);
        const seats = await getSeatData(date);
        io.emit(`get-data-${date}`,seats);
    })

    socket.on('book-seat',async({date,emp_id}:BookSeatSocket)=>{
        await mapSocketIdToEmployee(socket.id,emp_id);

        const employee = socketToEmployee.get(socket.id);
        
        
        await bookSeat(employee,date);
        const seats = await getSeatData(date);
        io.emit(`get-data-${date}`,seats);
    })
    socket.on('remove-seat',async({date,emp_id}:BookSeatSocket)=>{
        await mapSocketIdToEmployee(socket.id,emp_id);

        const employee = socketToEmployee.get(socket.id);
        
        
        await removeSeat(employee,date);
        const seats = await getSeatData(date);
        io.emit(`get-data-${date}`,seats);
    })


    //MEETINGS SOCKET
    socket.on('init-meet',async({floor_no,meet_no,emp_id}:InitMeetSocket)=>{
       await mapSocketIdToEmployee(socket.id,emp_id);
        
        const data = await getAllMeetings(floor_no,meet_no);
        io.emit(`get-meet-${floor_no}-${meet_no}`,data)
    })


    socket.on('book-meet',async(data:BookMeetSocket)=>{
        const {emp_id,floor_no,meet_no,start,end,date} = data;
        await mapSocketIdToEmployee(socket.id,emp_id);
        console.log(data);
        
        const employee =  socketToEmployee.get(socket.id);
        const result = await bookMeeting(employee,start,end,floor_no,meet_no,date);
        if(result.success){
            socket.emit('confirm-meet',result);
            const allMeetings = await getAllMeetings(floor_no,meet_no);
            console.log(allMeetings);
            
            io.emit(`get-meet-${floor_no}-${meet_no}`,allMeetings);
        }
        else{
            socket.emit('confirm-meet',result);
        }
        
    })


    //GET HISTORY SOCKET
    socket.on('get-history',async({emp_id,option,date}:GetHistorySocket)=>{
        await mapSocketIdToEmployee(socket.id,emp_id);

        const employee =  socketToEmployee.get(socket.id);
        let data:MeetsLog[] | unknown= [];
        if(option === 'meeting'){
            console.log('meeting-->',date);
            
            data = await getMeetingHistory(employee,date);
            console.log(data);
            
        }
        else{
            data =await getSeatingsHistory(date);

        }

        socket.emit('on-history',data);
        
    })

   
    socket.on('disconnect',async()=>{
        console.log('disconnected - '  + socket.id , "   ",'disconnect emp_id -> ',socketToEmployee.get(socket.id));
    
        try {
            await releaseAllselectedSeat(socketToEmployee.get(socket.id));
            socketToEmployee.delete(socket.id);
        } catch (error) {
            console.log(error);
        }

        const seats = await getSeatData();
        io.emit('get-data',seats);
    })
    
}


export default connectSocketIo;