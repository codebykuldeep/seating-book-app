import { IMeet } from "../types/dataTypes";

export function resolveTimeToDateNow(meet:IMeet):[number,number]{
    const {start_time,end_time} =meet;
    const curr_date = new Date();
    const [year,month,day]=[curr_date.getFullYear(),curr_date.getMonth(),curr_date.getDate()];
    
    
    const userStartTimeArr = start_time.split(':');
    const userEndTimeArr = end_time.split(':');
    const startTimeSec = new Date(year,month,day,Number(userStartTimeArr[0]),Number(userStartTimeArr[1])).getTime();
    const endTimeSec = new Date(year,month,day,Number(userEndTimeArr[0]),Number(userEndTimeArr[1])).getTime();

    return [startTimeSec,endTimeSec];
}


export function dateFormatter(value:string){
    return new Date(value).toLocaleDateString('en-US',{
        month:'long',
        day:"2-digit",
        year:'numeric'
    })
}