import { IMeet } from "../types/dataTypes";
import { MeetRoomState } from "../types/meetingsTypes";
import { resolveTimeToDateNow } from "../utils/dateUtils";

export function getRoomStatus(data:IMeet[]):MeetRoomState | null{
    const curr_time = Date.now();
    const len = data.length;

    for(let i =0 ;i < len ;i++){
        const [start,end] = resolveTimeToDateNow(data[i]);

        if(start<= curr_time && end>=curr_time){
            
            return {
                state:data[i],
                time_remain:end-curr_time
            };
        }
    }
    return null;
}

export function getDuration(meet:IMeet){
    const {start_time,end_time} =meet;
    const curr_date = new Date();
    const [year,month,day]=[curr_date.getFullYear(),curr_date.getMonth(),curr_date.getDay()];
    const userStartTimeArr = start_time.split(':');
    const userEndTimeArr = end_time.split(':');
    const startTimeSec = new Date(year,month,day,Number(userStartTimeArr[0]),Number(userStartTimeArr[1])).getTime();
    const endTimeSec = new Date(year,month,day,Number(userEndTimeArr[0]),Number(userEndTimeArr[1])).getTime();

    const diff = endTimeSec - startTimeSec;
    const mins = (diff/1000)/60;
    return `${Math.floor(mins)} min`
}