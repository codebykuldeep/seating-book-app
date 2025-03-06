import { DataSource } from "typeorm";
import { Employees } from "./entitites/employees";
import { Seats } from "./entitites/seats";
import { Meets } from "./entitites/meets";

export const db = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "seat-db",
    entities:[Employees,Seats,Meets],
    synchronize:true,
    logger:'simple-console',
})
