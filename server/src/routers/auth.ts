import express from "express";
import { forgotPassword, login, register, resetPassword } from "../controllers/auth";
import isAuthenticated from "../middlewares/auth";

const authRouter = express.Router();

// Endpoint to register a user.
authRouter.post("/register", register);

// Endpoint to login a user.
authRouter.post("/login", login);

//forgot-password
authRouter.post("/forgot-password", isAuthenticated, forgotPassword);
// Endpoint to reset password.
authRouter.post("/reset-password", isAuthenticated, resetPassword);

export default authRouter;
