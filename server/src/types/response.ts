import { Employees } from "../lib/entitites/employees";

export interface LoginResponse{
    status?:string;
    success?:boolean
    token?:string;
    user?:Employees
    message:string
}