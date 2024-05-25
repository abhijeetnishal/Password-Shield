"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const authRouter = express_1.default.Router();
// Endpoint to register a user.
authRouter.post("/register", auth_1.register);
// Endpoint to login a user.
authRouter.post("/login", auth_1.login);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map