const OTP_SESSION = new Map()


export function generateOTP(email:string){
    const OTP = 1000 + Math.floor(Math.random()*999 + 100);
    const otp_values= {
        otp:OTP,
        time:Date.now(),
    }
    OTP_SESSION.set(email,otp_values);
    return OTP;
}


export function verifyOTP(email:string,user_otp:string){
    const otp_data = OTP_SESSION.get(email);

    if(!otp_data){
        return {status:false,message:'Invalid OTP Session'}
    }
    const {otp,time} = otp_data;
    const curr_time = Date.now();

    
    if(curr_time - time >= 1000 * 60 * 5){
        OTP_SESSION.delete(email);
        return {status:false,message:'OTP expired'}
    }

    if(Number(otp) === Number(user_otp)){
        OTP_SESSION.delete(email);
        return {status:true,message:'OTP VERIFIED'}
    }
    else{
        return {status:false,message:'OTP Incorrect'}
    }
}