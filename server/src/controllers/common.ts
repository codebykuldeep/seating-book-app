import { Request, Response  } from 'express';
import { CustomError } from '../types/types';
import { Employees } from '../lib/entitites/employees';
import { sendLoginVerification } from '../services/nodemailer';
import { generateOTP, verifyOTP } from '../services/OTPservices';
import { generateJWTtoken, verifyJWTtoken } from '../auth/jwt';


export async function handleLogin(req:Request,res:Response) {
    const {email} = req.body;
    try {
        if(!email.includes('celestialsys.com')){
            throw new Error('Please your company email');
        }
        const otp = generateOTP(email);
        console.log('OTP  -----> ',otp);
        
        await sendLoginVerification(email,otp);
        
        return res.json({message:'REQUEST RECIEVED',email})
    } catch (error) {
        
        return res.json({message:(error as CustomError).message})
    }
    
}





export async function handleLoginVerification(req:Request,res:Response) {
    const {email,code} = req.body;
    try {
        console.log(req.body);
        const otp_result = verifyOTP(email,code);
        if(!otp_result.status){
            throw new Error(otp_result.message);
        }
        
        const employee = await Employees.findOne({where:{email}});
        if(!employee){
            const nameFromMail = email.split('@')[0];
            const [firstName,...lastName] = nameFromMail.split('.');
            const fullName = firstName + " " + lastName;

            const user = new Employees();
            user.email = email;
            user.name = fullName;
            await user.save();
            console.log(user);
            
            const token = generateJWTtoken(user);
            return res.json({success:true,user:user,message:'OTP verified',token:token})
        }
        console.log(employee);
        
        const token = generateJWTtoken(employee);
        return res.json({success:true,user:employee,message:'OTP verified',token:token})
    } catch (error) {
        
        return res.status(500).json({message:(error as CustomError).message})
    }
}





export async function handleUserVerification(req:Request,res:Response) {
    const {token} = req.query;
    try {
        const user = verifyJWTtoken((token as string)) as Employees;
        const employee = await Employees.findOne({where:{email:user.email}});
        
    } catch (error) {
        
        return res.status(500).json({message:(error as CustomError).message})
    }
}