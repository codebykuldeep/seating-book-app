import { SeatsLog } from "../lib/entitites/seatLog";
import { BookStatus, Seats } from "../lib/entitites/seats";


export async function getSeatingsHistory(date:string){
    
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
        date:date,
        book_status:BookStatus.BOOK,
    }
   }) 
   
   
   const seatsSize = seats.length;

   for(let i = 0;i<seatsSize;i++){
        seats[i].book_status=BookStatus.NONE;
        seats[i].employee = null;

        const match = seatsLog.find((log)=>Number(log.seat_no) === Number(seats[i].seat_no));
        if(match){
            seats[i].book_status = BookStatus.BOOK;
            seats[i].employee = match.booked_by;
        }
   }
   
    return seats;
}