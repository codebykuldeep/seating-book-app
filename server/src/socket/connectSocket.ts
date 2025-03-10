import { Socket } from "socket.io";
import { io } from "../app";
import { bookSeat, getSeatData, releaseAllselectedSeat, removeSeat, selectedSeat, unselectSeat } from "../controllers/seats";
import { Employees } from "../lib/entitites/employees";
import { bookMeeting, deleteMeeting, getAllMeetings, getAllUserMeetings, getMeetingHistory } from "../controllers/meets";
import { BookMeetSocket, CustomError, GetHistorySocket } from "../types/types";
import { getSeatingsHistory } from "../controllers/seatsLog";
import { BookSeatSocket, DeleteMeetSocket, GetUserMeetSocket, InitMeetSocket, InitSeatSocket, SelectSeatSocket, UnSelectSeatSocket } from "../types/socketTypes";
import { verifyJWTtoken } from "../auth/jwt";

const socketToEmployee = new Map();


async function mapSocketIdToEmployeeAuth(id: string, token: string) {
  const userData = verifyJWTtoken(token) as Employees;
  const { emp_id } = userData;
  if (!socketToEmployee.get(id)) {
    const employee = await Employees.findOne({
      where: { emp_id: Number(emp_id) },
    });
    socketToEmployee.set(id, employee);
  }
}

async function connectSocketIo(socket:Socket){
    console.log('USER CONNECTED - ',socket.id);
    try {
        await mapSocketIdToEmployeeAuth(socket.id,socket.handshake.auth.token);
    } catch (error) {
        console.log(error);
        socket.emit('error',"Not Authorized")
    }

    //SEATING SOCKETS
    socket.on('init-data',async({date}:InitSeatSocket)=>{
        try {
            const seats = await getSeatData(date);
        
            io.emit(`get-data-${date}`,seats);
        } catch (error) {
            const message = (error as CustomError).message as string;
            socket.emit('error',{message})
        }
    })


    socket.on('select-seat',async({date,seat_no}:SelectSeatSocket)=>{
        try {
            const employee =  socketToEmployee.get(socket.id);
            
            await selectedSeat(seat_no,employee,date);
            const seats = await getSeatData(date);
            io.emit(`get-data-${date}`,seats);
        } catch (error) {
            const message = (error as CustomError).message as string;
            socket.emit('error',{message})
        }
    })

    socket.on('unselect-seat',async({date}:UnSelectSeatSocket)=>{
        try {
            const employee =  socketToEmployee.get(socket.id);
            
            await unselectSeat(employee,date);
            const seats = await getSeatData(date);
            io.emit(`get-data-${date}`,seats);
        } catch (error) {
            const message = (error as CustomError).message as string;
            socket.emit('error',{message})
        }
    })

    socket.on('book-seat',async({date}:BookSeatSocket)=>{
        try {
            const employee = socketToEmployee.get(socket.id);
            
            
            await bookSeat(employee,date);
            const seats = await getSeatData(date);
            io.emit(`get-data-${date}`,seats);
        } catch (error) {
            const message = (error as CustomError).message as string;
            socket.emit('error',{message})
        }
    })
    socket.on('remove-seat',async({date}:BookSeatSocket)=>{
        try {
            const employee = socketToEmployee.get(socket.id);
            
            
            await removeSeat(employee,date);
            const seats = await getSeatData(date);
            io.emit(`get-data-${date}`,seats);
        } catch (error) {
            const message = (error as CustomError).message as string;
            socket.emit('error',{message})
        }
    })


    //MEETINGS SOCKET
    socket.on('init-meet',async({floor_no,meet_no}:InitMeetSocket)=>{
       try {
            
            const data = await getAllMeetings(floor_no,meet_no);
            io.emit(`get-meet-${floor_no}-${meet_no}`,data)
       } catch (error) {
            const message = (error as CustomError).message as string;
            socket.emit('error',{message})
       }
    })


    socket.on('book-meet',async(data:BookMeetSocket)=>{
        try {
            const {floor_no,meet_no,start,end,date} = data;
            
            const employee =  socketToEmployee.get(socket.id);
            const result = await bookMeeting(employee,start,end,floor_no,meet_no,date);
            if(result.success){
                socket.emit('confirm-meet',result);
                const allMeetings = await getAllMeetings(floor_no,meet_no);
                
                io.emit(`get-meet-${floor_no}-${meet_no}`,allMeetings);
            }
            else{
                socket.emit('confirm-meet',result);
            }
        } catch (error) {
            const message = (error as CustomError).message as string;
            socket.emit('error',{message})
        }
        
    })

    //GET USER MEETS
    socket.on('my-meets',async({date}:GetUserMeetSocket)=>{
       try {
            
            const employee =  socketToEmployee.get(socket.id);

            const data = await getAllUserMeetings(employee,date);
            socket.emit('meets-data',data);
       } catch (error) {
            const message = (error as CustomError).message as string;
            socket.emit('error',{message})
       }
    })

    socket.on('delete-meet',async({date,meet_id}:DeleteMeetSocket)=>{
        try {
            
            const employee =  socketToEmployee.get(socket.id);

            await deleteMeeting(employee,meet_id)
            const data = await getAllUserMeetings(employee,date);
            socket.emit('meets-data',data);
        } catch (error) {
            const message = (error as CustomError).message as string;
            socket.emit('error',{message})
        }
    })


    //GET HISTORY SOCKET
    socket.on('get-history',async({option,date}:GetHistorySocket)=>{
        try {
            
            const employee =  socketToEmployee.get(socket.id);
            let data: unknown= [];
            if(option === 'meeting'){
                
                data = await getMeetingHistory(employee,date);
                
            }
            else{
                data =await getSeatingsHistory(date);

            }

            socket.emit('on-history',data);
        } catch (error) {
            const message = (error as CustomError).message as string;
            socket.emit('error',{message})
        }
        
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