import express from "express";
import { getUserDetails } from "../controllers/user";
import isAuthenticated from "../middlewares/auth";

const userRouter = express.Router();

userRouter.get("/users", isAuthenticated, getUserDetails);

export { userRouter };
