import { DataSource } from "typeorm";
// import path from "path";
import { Seats } from "./entitites/seats";
import { MeetsLog } from "./entitites/meetLog";
import { SeatsLog } from "./entitites/seatLog";
import { Employees } from "./entitites/employees";
import { DB_CONFIG } from "../config";

// export const db = new DataSource({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "root",
//     database: "seat_db",
//     entities:[Employees,Seats,MeetsLog,SeatsLog],
//     synchronize:true,
//     logger:'simple-console',
//     //logging:true,
// })

export const db = new DataSource({
    type: "postgres",
    host: DB_CONFIG.PGHOST,
    port: 5432,
    username: DB_CONFIG.PGUSER,
    password: DB_CONFIG.PGPASSWORD,
    database: DB_CONFIG.PGDATABASE,
    entities:[Employees,Seats,MeetsLog,SeatsLog],
    synchronize:true,
    logger:'simple-console',
    ssl:true,
    //logging:true,
})


