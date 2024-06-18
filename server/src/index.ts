import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import schemaRouter from "./routers/schema";
import passwordRouter from "./routers/password";
import authRouter from "./routers/auth";
import { userRouter } from "./routers/user";

// Configure env
dotenv.config();

// Create an express instance
const app = express();

// To parse the incoming requests with JSON we are using express.json() which is a built-in middleware function in Express.
app.use(express.json());

// Define port
const port = process.env.PORT || 8080;

// Check environment
const isProduction = process.env.NODE_ENV === "production";

// CORS Configuration
const corsOptions = {
  origin: isProduction ? process.env.CLIENT_PROD_URL : "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

// This will allow the users in the frontend to consume the API's.
app.use(cors(corsOptions));

// Disable X-Powered-By Header
app.disable("x-powered-by");

app.set("trust proxy", true);

// Schema router - to create schemas
app.use(schemaRouter);

// Auth Router
app.use("/auth/v1/", authRouter);

// Users Router
app.use("/api/v1/", userRouter);

// Passwords router
app.use("/api/v1/", passwordRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json("Server is Live");
});

app.listen(port, () => {
  console.log("Server listening at port " + port);
});
