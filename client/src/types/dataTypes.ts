export interface IUser{
    emp_id:string;
    email:string;
    name:string;
}


export interface ISeat{
    seat_no:number;
    floor_no:number;
    book_status:"" | "SELECTED" | "BOOKED" ;
    employee:IUser | null;
}

export interface IMeet {
  booked_by: IUser;
  date: string;
  end_time: string;
  floor_no: number;
  meet_id: number;
  meet_no: number;
  start_time: string;
}




export interface ColumnType {
    id: string;
    label: string;
    minWidth?: number;
    align?: "right" | "center" | "left";
    format?: (value: string) => string | React.ReactNode;
  }
  
  