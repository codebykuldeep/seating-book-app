import { db } from "../lib/db";
import { Employees } from "../lib/entitites/employees";
import { SeatsLog } from "../lib/entitites/seatLog";
import { BookStatus, Seats } from "../lib/entitites/seats";

export async function getSeatData(){
    const seatData = await Seats.find({order:{
        seat_no:"ASC"
    }});
    return seatData
}


export async function selectedSeat(seat_no:string,employee:Employees){
    //const employee = await Employees.findOne({where:{emp_id:Number(emp_id)}})
    //console.log(employee);
    
    const bookedSeat = await Seats.findOne({where:{employee:employee!,book_status:BookStatus.BOOK}});
    //console.log(bookedSeat);

    if(!bookedSeat){
        await db.createQueryBuilder().update(Seats).set({employee:null,book_status:BookStatus.NONE}).where("emp_id = :id", { id: employee?.emp_id }).execute();
        const seatData = await Seats.update(seat_no,{
            book_status:BookStatus.SELECT,
            employee:employee!
        });
        return seatData
    }
    
}


export async function unselectSeat(employee:Employees){
    await db.createQueryBuilder().update(Seats).set({employee:null,book_status:BookStatus.NONE}).where("emp_id = :id", { id: employee?.emp_id }).execute();
}

export async function releaseSelectedSeat(employee:Employees){
    const {emp_id} = employee;
    const bookedSeat = await Seats.findOne({where:{employee:employee!,book_status:BookStatus.BOOK}});
    if(!bookedSeat){
        await db.createQueryBuilder().update(Seats).set({employee:null,book_status:BookStatus.NONE}).where("emp_id = :id", { id:emp_id }).execute();
    }
    
}

export async function bookSeat(employee:Employees) {
    await db.createQueryBuilder().update(Seats).set({book_status:BookStatus.BOOK}).where("emp_id = :id", { id: employee?.emp_id }).execute();
    const seatData = await Seats.findOne({where:{employee}});
    if(!seatData) return; 
    
    const seatLog = new SeatsLog();
    const curr_date = new Date().toISOString().split('T')[0];
    seatLog.seat_no = seatData.seat_no;
    seatLog.booked_by = employee;
    seatLog.date = curr_date;
    await seatLog.save();
}