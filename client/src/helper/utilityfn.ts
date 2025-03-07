import { IMeet, ISeat } from "../types/dataTypes";

export function getToken(){
    if(localStorage.getItem('token'))
         return localStorage.getItem('token') ;
    else
        return '';
}

export function setToken(token:string){
    return localStorage.setItem('token',token);
}

export function removeToken(){
    return localStorage.removeItem('token');
}

export function getUserSeatWithStatus(data:ISeat[],emp_id:string|number){
    const size = data.length;
    for(let i = 0 ; i < size ; i++){
        if(data[i].employee && Number(data[i].employee!.emp_id) === Number(emp_id)){
            return [data[i].seat_no,data[i].book_status]
        }
    }
    return [-1,''];
}
