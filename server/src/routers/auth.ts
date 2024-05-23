import express from "express";
import { login, register } from "../controllers/auth";

const authRouter = express.Router();

// Endpoint to register a user.
authRouter.post("/register", register);

// Endpoint to login a user.
authRouter.post("/login", login);

export default authRouter;
