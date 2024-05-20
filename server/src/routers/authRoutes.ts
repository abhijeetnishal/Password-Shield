//import express to use router method
import express from "express";
//express.Router() is a method in the Express.js that creates a new router object.
//It is used to define routes for a specific endpoint.
const userRouter = express.Router();

//import methods from authController
import { login, logout, register, sendPasswordResetEmail,resetpassword } from "../controller/authControllers";

//create an endpoint for registering a user.
userRouter.post("/register", register);

//create an endpoint for logging a user.
userRouter.post("/login", login);

//create an endpoint for logout
userRouter.post("/logout", logout);
userRouter.post("/sendemail", sendPasswordResetEmail);
userRouter.post("/resetpassword", resetpassword);

//export to router to use in other files (index.js file)
export default userRouter;
