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

app.listen(port, () =>{
  console.log("Server is working on Port:" + port + " in " + envMode + " Mode.");
  db.initialize().then(()=>{
    console.log('DB CONNECTED')
  })
  .catch((error)=>{
    throw new Error(error);
  });
});
