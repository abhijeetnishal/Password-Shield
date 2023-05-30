//import express to use router method
import express from 'express';
//express.Router() is a method in the Express.js that creates a new router object.
//It is used to define routes for a specific endpoint.
const userRouter = express.Router();

//import methods from authController
import auth from '../controller/authControllers'

//create endpoint for registering a user.
userRouter.post('/register', auth.register);

//create endpoint for logging a user.
userRouter.post('/login', auth.login);

//create endpoint for logout
userRouter.post('/logout', auth.logout);

//export to router to use in other files (index.js file)
export default userRouter;