import { FormStateType } from "../types/formTypes";

function nameValidation(value:string):[string,boolean]{
    if(value.trim()===''){
        return ['This field is required',true];
    }

    const pattern = /^[a-zA-Z ]*$/;
    if(!pattern.test(value)){
        return ['Enter a valid name',true];
    }
    else if(value.length <3){
        return ['Enter a name of valid length',true];
    }
    return ['',false];
}
function emailValidation(value:string):[string,boolean]{
    if(value.trim()===''){
        return ['This field is required',true];
    }

    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!pattern.test(value)){
        return ['Enter a valid Email',true];
    }

    if(!value.includes('celestialsys.com')){
        return ['Enter your company email',true];
    }
    return ['',false];
}



function fieldValidation(value:string):[string,boolean]{
    if(!value){
        return ['This field is required',true];
    }
    
    if(String(value).trim() ===''){
        return ['This field is required',true];
    }
    else if(String(value).length < 3){
        return ['Please enter valid data',true];
    }
    
    return ['',false];
}

export function validation(title:string,value:string):[string,boolean]{
   
    title = title.toLowerCase();
    if(title === 'email'){
        return emailValidation(value);
    }

    
    if(title === 'name' ){
        return nameValidation(value);
    }

    return fieldValidation(value);
}

export function checkValidFormState(formState:FormStateType){
    for(const key in formState){
    const [,state] = validation(key,formState[key].value)
    if(state === true){
        
        return false;
    }
    if(formState[key].status || !String(formState[key].value)){
        return false;
    }  
    }
    return true;
}

export function populateFormState(formState:FormStateType){
    for(const key in formState){
         const [msg,status] = validation(key,formState[key].value);
         formState ={
            ...formState,
            [key]:{
                message:msg,
                status:status,
                value:formState[key].value
            }
         }
    }
    
    return formState;
}


export function validMeetingTime(start:string,end:string){
    if(start=== '') return {error:false,message:''};
    if(end === "") return  {error:false,message:''}

    
    const [end_hour,end_min] = end.split(':');
    const [start_hour,start_min] = start.split(':');

    if(Number(start_hour) < Number (end_hour) ){
        return {error:false,message:''};
    }
    else if(Number(end_hour) > Number (start_hour)){
        return {error:false,message:''};
    }
    if(Number(start_hour) === Number(end_hour) && Number(start_min)< Number(end_min)){
        return {error:false,message:''};
    }
    else{
        return {error:true,message:'select a valid meeting time'};
    }
}


