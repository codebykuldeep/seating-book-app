export interface InitSeatSocket{
    date:string;
}
export interface SelectSeatSocket{
    date:string;
    seat_no:string;
    emp_id:string
}

export interface UnSelectSeatSocket{
    date:string;
    emp_id:string;
}


export interface BookSeatSocket{
    date:string;
    emp_id:string;
}


export interface InitMeetSocket{
    floor_no:string;
    meet_no:string;
    emp_id:string;
}