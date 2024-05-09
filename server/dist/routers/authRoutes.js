"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import express to use router method
const express_1 = __importDefault(require("express"));
//express.Router() is a method in the Express.js that creates a new router object.
//It is used to define routes for a specific endpoint.
const userRouter = express_1.default.Router();
//import methods from authController
const authControllers_1 = require("../controller/authControllers");
//create an endpoint for registering a user.
userRouter.post("/register", authControllers_1.register);
//create an endpoint for logging a user.
userRouter.post("/login", authControllers_1.login);
//create an endpoint for logout
userRouter.post("/logout", authControllers_1.logout);
//export to router to use in other files (index.js file)
exports.default = userRouter;
//# sourceMappingURL=authRoutes.js.map