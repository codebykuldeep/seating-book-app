import { Request, Response  } from 'express';
import { CustomError } from '../types/types';
import { Employees } from '../lib/entitites/employees';
import { sendLoginVerification } from '../services/nodemailer';
import { generateOTP, verifyOTP } from '../services/OTPservices';
import { generateJWTtoken, verifyJWTtoken } from '../auth/jwt';
import { getNameFromEmail } from '../utils/utils';


export async function handleLogin(req:Request,res:Response) {
    const {email} = req.body;
    try {
        if(!email.includes('celestialsys.com')){
            throw new Error('Please your company email');
        }
        const otp = generateOTP(email);
        console.log('OTP  -----> ',otp);
        
        await sendLoginVerification(email,otp);
        
        return res.json({success:true,message:'OTP sent to your email',email})
    } catch (error) {
        
        return res.json({message:(error as CustomError).message,success:false})
    }
    
}





export async function handleLoginVerification(req:Request,res:Response) {
    const {email,code} = req.body;
    try {
        
        const otp_result = verifyOTP(email,code);
        if(!otp_result.status){
            throw new Error(otp_result.message);
        }
        
        const employee = await Employees.findOne({where:{email}});
        if(!employee){
            const fullName = getNameFromEmail(email.toLowerCase());
            
            const user = new Employees();
            user.email = email;
            user.name = fullName;
            await user.save();
            
            
            const token = generateJWTtoken(user);
            return res.json({success:true,user:user,message:'OTP verified',token:token})
        }
        
        
        const token = generateJWTtoken(employee);
        return res.json({success:true,user:employee,message:'OTP verified',token:token})
    } catch (error) {
        
        return res.json({message:(error as CustomError).message,success:false})
    }
}





export async function handleUserVerification(req:Request,res:Response) {
    const token = req.headers['authorization'];
    if(!token){
        return res.json({message:'please provide auth token',success:false})
    }
    try {
        const user = verifyJWTtoken((token as string)) as Employees;
        const employee = await Employees.findOne({where:{email:user.email}});
        if(!employee){
            return res.json({success:true,user:employee,message:'verification failed',token:null})
        }
        const new_token = generateJWTtoken(employee);
        return res.json({success:true,user:employee,message:'verification succeed',token:new_token})
    } catch (error) {
        
        return res.json({message:(error as CustomError).message,success:false})
    }
}
