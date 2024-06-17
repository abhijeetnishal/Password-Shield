import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/auth";
import isAuthenticated from "../middlewares/auth";

const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/forgot-password", forgotPassword);

authRouter.post("/reset-password", isAuthenticated, resetPassword);

export default authRouter;
