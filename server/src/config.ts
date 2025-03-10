import process from "process";
import dotenv from "dotenv";

dotenv.config({path:'./.env'})

export const CONFIG ={
    PORT:process.env.PORT,
    CLIENT:process.env.CLIENT_URL
}

export const  MAIL_CONFIG={
    NODE_MAIL:process.env.NODE_MAIL,
    NODE_PASS:process.env.NODE_PASS,
}

export const DB_CONFIG ={
    PGHOST:process.env.PGHOST,
    PGDATABASE:process.env.PGDATABASE,
    PGUSER:process.env.PGUSER,
    PGPASSWORD:process.env.PGPASSWORD,
}