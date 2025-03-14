import { Employees } from "../lib/entitites/employees";
import { SeatsLog } from "../lib/entitites/seatLog";
import { BookStatus, Seats } from "../lib/entitites/seats";
import { sendSeatBookedMail } from "../services/nodemailer";


const curr_date = new Date().toISOString().split('T')[0];

export async function getSeatData(date:string=curr_date){
    
    try {
        const seats = await Seats.find({
            where:{
                floor_no:1,
            },
            order:{
                seat_no:"ASC",
            }
        })
       const seatsLog = await SeatsLog.find({
        where:{
            date:date
        }
       }) 
       
       
       const seatsSize = seats.length;
    
       for(let i = 0;i<seatsSize;i++){
            seats[i].book_status=BookStatus.NONE;
            seats[i].employee = null;
    
            const match = seatsLog.find((log)=>Number(log.seat_no) === Number(seats[i].seat_no));
            if(match){
                seats[i].book_status = match.book_status;
                seats[i].employee = match.booked_by;
            }
       }
       
        return seats;
    } catch (error) {
        console.log(error);
        return [];
    }
}


export async function selectedSeat(seat_no:string,employee:Employees,date:string){
    
    const bookedSeat = await SeatsLog.findOne({
        where:{
            date:date,
            booked_by:employee!,
        }
    });

    if(!bookedSeat){
        const seatLog = new SeatsLog();
        seatLog.seat_no = Number(seat_no);
        seatLog.booked_by = employee;
        seatLog.date = date;
        seatLog.book_status = BookStatus.SELECT;
        await seatLog.save();
    }
    else if(bookedSeat.book_status === BookStatus.SELECT){
        const booked_by = employee;
        const seatData = await SeatsLog.update({date,booked_by},{
            book_status:BookStatus.SELECT,
            seat_no:Number(seat_no)
        });
        return seatData
    }
    
}


export async function unselectSeat(employee:Employees,date:string){
    const selectedSeat = await SeatsLog.findOne({
        where:{
            date:date,
            booked_by:employee!,
            book_status:BookStatus.SELECT,
        }
    });
    if(!selectedSeat) return ;
    
    await selectedSeat?.remove();
}

export async function releaseAllselectedSeat(employee:Employees){
    const selectedSeat = await SeatsLog.find({
        where:{
            book_status:BookStatus.SELECT,
            booked_by:employee!,
        }
    });
    if(selectedSeat.length === 0) return ;
    
    await SeatsLog.remove(selectedSeat);
}


export async function bookSeat(employee:Employees,date:string) {
    
    const booked_by = employee;

    await SeatsLog.update({date,booked_by},{
        book_status:BookStatus.BOOK,
    });
    SeatsLog.findOne({
        where:{
            date:date,
            booked_by,
        }
    }).then(data=>{
        if(!data) return;
        sendSeatBookedMail(employee.email,data)
    })
    
}

export async function removeSeat(employee:Employees,date:string) {
    
    const booked_by = employee;

    const bookedSeat = await SeatsLog.findOne({
        where:{
            book_status:BookStatus.BOOK,
            date:date,
            booked_by
        }
    });
    if(!bookedSeat) return;

    await bookedSeat?.remove();
}