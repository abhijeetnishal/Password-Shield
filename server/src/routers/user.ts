import express from "express";
import { getUserDetails } from "../controllers/user";
import isAuthenticated from "../middlewares/auth";
import createSchemas from "../models/schemas";

const userRouter = express.Router();

userRouter.get("/users", isAuthenticated, getUserDetails);
userRouter.get("/schema", createSchemas);

export { userRouter };
