import { Employees } from "../lib/entitites/employees";
import { MeetsLog } from "../lib/entitites/meetLog";


export async function getMeetingHistory(employee:Employees,date:string) {
    try {
        
        const data = await MeetsLog.find({
            where:{
                booked_by:employee,
                date:date
            },
            order:{
                start_time:"DESC"
            }
        });
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getAllMeetings(floor_no:string,meet_no:string){
    try {
        console.log(floor_no," ",meet_no);
        const date  = new Date().toISOString().split('T')[0];
        const data = await MeetsLog.find({
            where:{
                date:date,
                floor_no:Number(floor_no),
                meet_no:Number(meet_no)
            },
            order:{
                start_time:"ASC"
            }
        });
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function bookMeeting(employee:Employees,start:string,end:string,floor_no:string,meet_no:string,date:string){
    
    const result = await MeetsLog.find({
        where:{
            floor_no:Number(floor_no),
            meet_no:Number(meet_no),
            date:date,
        },
        order:{
            start_time:"ASC"
        }
    });
    if(checkMeetPossible(result,start,end,date)){
        const newMeet = new MeetsLog();
        newMeet.start_time = start;
        newMeet.end_time = end;
        newMeet.booked_by = employee;
        newMeet.floor_no = Number(floor_no);
        newMeet.meet_no = Number(meet_no);
        newMeet.date = date;
        await newMeet.save();
    }
    else{
        console.log('not possible');
        return {success:false,message:'Meeting slot not available'}
    }
    return {success:true,message:'Meeting slot reserved'}
        
}

function checkMeetPossible(allMeetList:MeetsLog[],start:string,end:string,date:string){
    const curr_date = new Date(date);
    const [year,month,day]=[curr_date.getFullYear(),curr_date.getMonth(),curr_date.getDay()];
    const meetArr:[number,number][]= [];
    allMeetList.forEach((meet)=>{
        const entry:[number,number] = [0,0];
        const stTimeArr = meet.start_time.split(':');
        const endTimeArr = meet.end_time.split(':');
        const stTimeSec = new Date(year,month,day,Number(stTimeArr[0]),Number(stTimeArr[1]),Number(stTimeArr[2])).getTime();
        const endTimeSec = new Date(year,month,day,Number(endTimeArr[0]),Number(endTimeArr[1]),Number(endTimeArr[2])).getTime();
        entry[0] = stTimeSec;
        entry[1] = endTimeSec;
        meetArr.push(entry);
    })
    console.log(meetArr);
    const userStartTimeArr = start.split(':');
    const userEndTimeArr = end.split(':');
    const startTimeSec = new Date(year,month,day,Number(userStartTimeArr[0]),Number(userStartTimeArr[1])).getTime();
    const endTimeSec = new Date(year,month,day,Number(userEndTimeArr[0]),Number(userEndTimeArr[1])).getTime();
    console.log(startTimeSec,'  ',endTimeSec);
    
    const meetArrSize = meetArr.length;
    for(let i = 0; i<meetArrSize ;i++){
        if((meetArr[i][1] > startTimeSec &&  meetArr[i][0] < startTimeSec) || (meetArr[i][1] > endTimeSec &&  meetArr[i][0] < endTimeSec))
            return false;
        if(meetArr[i][0] === startTimeSec && meetArr[i][1] === endTimeSec)
            return false;
    }
    return true; 
}
