import jwt from 'jsonwebtoken';
import { Employees } from '../lib/entitites/employees';

const SECRET = 'HELLO WORLD';

export function generateJWTtoken(user:Employees){
    
    const payload = {
        emp_id:user.emp_id,
        name:user.name,
        email:user.email,
    }

    const token = jwt.sign(payload,SECRET);
    return token;
}


export function verifyJWTtoken(token:string){
    const payload = jwt.verify(token,SECRET);
    return payload;
}