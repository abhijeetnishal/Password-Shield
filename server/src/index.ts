import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

//configure env
dotenv.config();

//create an express instance
const app = express();

//To parse the incoming requests with JSON we are using express.json() which is a built-in middleware function in Express.
app.use(express.json());

//The cookie-parser middleware is used to parse cookies from incoming requests, making them available in the req.cookies object.
app.use(cookieParser());

//Define port
const port = process.env.Port || 8080;

// Check environment
const isProduction = process.env.NODE_ENV === "production";

// CORS Configuration
const corsOptions = {
  origin: isProduction ? process.env.CLIENT_URL : "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

// This will allow the user in the frontend to consume the APIs that you have created without any problem.
app.use(cors(corsOptions));

// Disable X-Powered-By Header
app.disable("x-powered-by");

app.set("trust proxy", true);

//schema router - hit this endpoint once to create schemas
import schemaRouter from './routers/schemaRoute';
app.use(schemaRouter);

//user Router  
import userRouter from './routers/authRoutes';
app.use('/auth', userRouter)

//password router
import passwordRouter from './routers/passwordRoutes';
app.use('/passwords', passwordRouter);

//get request when server is live
app.get('/', (req: Request, res: Response) => {
    res.status(200).json('Server is Live');
})

app.listen(port, () => {
    console.log('Server listening at port ' + port);
})