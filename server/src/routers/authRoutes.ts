import express from "express";
import { login, register } from "../controllers/authControllers";

const userRouter = express.Router();

// Endpoint to register a user.
userRouter.post("/register", register);

// Endpoint to login a user.
userRouter.post("/login", login);

export default userRouter;
