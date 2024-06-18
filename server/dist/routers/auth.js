"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const auth_2 = __importDefault(require("../middlewares/auth"));
const authRouter = express_1.default.Router();
authRouter.post("/register", auth_1.register);
authRouter.post("/login", auth_1.login);
authRouter.post("/forgot-password", auth_1.forgotPassword);
authRouter.post("/reset-password", auth_2.default, auth_1.resetPassword);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map