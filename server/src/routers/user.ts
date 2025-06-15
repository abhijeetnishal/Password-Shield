import express from "express";
import { getUserVerifyDetails } from "../controllers/user";
import isAuthenticated from "../middlewares/auth";

const userRouter = express.Router();

userRouter.get("/users/verify", isAuthenticated, getUserVerifyDetails);

export { userRouter };
