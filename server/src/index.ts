import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

//create an express instance
const app = express();

//To parse the incoming requests with JSON we are using express.json() which is a built-in middleware function in Express.
app.use(express.json());

//The cookie-parser middleware is used to parse cookies from incoming requests, making them available in the req.cookies object.
app.use(cookieParser());

//configure env
dotenv.config();

//Define port
const port = process.env.port || 8080;

//This will allow the user in the frontend to consume the APIs that you have created without any problem.
app.use(cors({credentials:true, origin: ['http://localhost:3000','https://mypasswordmanager.vercel.app']}));

//import database connection file
import dbConnect from '../src/models/dbConnect';
//execute database connection 
dbConnect(); 

//user Router  
import userRouter from './routes/authRoutes';
app.use('/auth/',userRouter)

import passwordRouter from './routes/passwordRoutes';
app.use('/passwords', passwordRouter);

//get request when server is live
app.get('/',(req, res)=>{
    res.status(200).json('Server is Live');
})

app.listen(port, ()=>{
    console.log('Server listening at port ' + port);
})