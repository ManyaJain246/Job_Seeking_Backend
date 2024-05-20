import express from "express";
import dotenv from "dotenv";
import cors from 'cors';                   // for connecting frontend with backend
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userrouter from "./routes/userrouter.js";
import applicationrouter from "./routes/applicationrouter.js";
import jobrouter from "./routes/jobrouter.js";
import {dbconnections} from "./database/dbconnections.js";
import {errormiddleware} from "./middlewares/error.js";

const app=express();
dotenv.config({path:"./config/config.env"})

// for using middlewares

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    method:["GET", "POST", "DELETE", "PUT"],
    credentials:true,
}));


app.use(cookieParser())
app.use(express.json())                      // parses only json data
app.use(express.urlencoded({extended:true})) // converts string to json format


app.use(
    fileUpload({
useTempFiles:true,
tempFileDir:"/tmp/",
}));


app.use("/api/v1/user", userrouter)
app.use("/api/v1/application", applicationrouter)
app.use("/api/v1/job", jobrouter)

dbconnections();

app.use(errormiddleware)
export default app;