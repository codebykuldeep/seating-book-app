import "reflect-metadata"
import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error";
import morgan from "morgan";
import dotenv from "dotenv";
import { CONFIG } from "./config";
import { db } from "./lib/db";


//ROUTER IMPORT
import commonRouter from './routes/common'
import { createServer } from "node:http";
import { Server } from "socket.io";
import connectSocketIo from "./socket/connectSocket";

dotenv.config();


export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = CONFIG.PORT || 3000;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: " * ", credentials: true }));
app.use(morgan("dev"));

app.use('/',commonRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// your routes here

app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

app.use(errorMiddleware);


const server = createServer(app);

export const io = new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
});



server.listen(port, () =>{
  console.log('----------------------------------------\n');
  console.log("Server is working on Port:" + port + " in " + envMode + " Mode.");
  db.initialize().then(()=>{
    console.log('DB CONNECTED');


    io.use((socket,next)=>{
      if(socket.handshake.auth.token){
        next();
      }
      else{
        next(new Error("thou shall not pass"));
      }     
    })
    io.on('connection',connectSocketIo)


    console.log('\n----------------------------------------');
  })
  .catch((error)=>{
    throw new Error(error);
  });
});
