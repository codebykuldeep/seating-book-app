import process from "process";
import dotenv from "dotenv";

dotenv.config({path:'./.env'})

export const CONFIG ={
    PORT:process.env.PORT,
}

export const  MAIL_CONFIG={
    NODE_MAIL:process.env.NODE_MAIL,
    NODE_PASS:process.env.NODE_PASS,
}
