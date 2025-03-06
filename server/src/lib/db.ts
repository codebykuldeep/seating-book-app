import { DataSource } from "typeorm";
import path from "path";

export const db = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "seat_db",
    entities:[path.resolve('src','lib','entitites')+'/*.ts'],
    synchronize:true,
    logger:'simple-console',
    //logging:true,
})


