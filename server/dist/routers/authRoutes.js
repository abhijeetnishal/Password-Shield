"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
const userRouter = express_1.default.Router();
// Endpoint to register a user.
userRouter.post("/register", authControllers_1.register);
// Endpoint to login a user.
userRouter.post("/login", authControllers_1.login);
exports.default = userRouter;
//# sourceMappingURL=authRoutes.js.map