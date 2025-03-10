export interface CustomError{
    message:string;
}

export interface BookMeetSocket{
    floor_no:string;
    meet_no:string;
    emp_id:string;
    start:string;
    end:string;
    date:string
}

export interface GetHistorySocket{
    emp_id:string;
    option:string;
    date:string;
}