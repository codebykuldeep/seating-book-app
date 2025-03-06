import { redirect } from "react-router-dom";
import { getToken } from "../helper/utilityfn";

export function authLoader(){
    if(getToken()){
        return redirect('/');
    }
    
    return null;
}

export function HomeLoader(){
    if(getToken()){
        return null;
    }
    else{
        return redirect('/login');
    }
}