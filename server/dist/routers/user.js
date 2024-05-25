"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const auth_1 = __importDefault(require("../middlewares/auth"));
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.get("/users", auth_1.default, user_1.getUserDetails);
//# sourceMappingURL=user.js.map