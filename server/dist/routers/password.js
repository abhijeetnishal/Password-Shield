"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const password_1 = require("../controllers/password");
const passwordRouter = express_1.default.Router();
// Endpoint to retrieve all passwords for the authenticated user
passwordRouter.get("/passwords/", auth_1.default, password_1.getAllPasswords);
// Endpoint to create a new password entry
passwordRouter.post("/passwords/", auth_1.default, password_1.createPassword);
// Endpoint to update password entry
passwordRouter.put("/passwords/:id", auth_1.default, password_1.updatePassword);
// Endpoint to delete password entry
passwordRouter.delete("/passwords/:id", auth_1.default, password_1.deletePassword);
exports.default = passwordRouter;
//# sourceMappingURL=password.js.map