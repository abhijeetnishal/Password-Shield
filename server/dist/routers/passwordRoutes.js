"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const passwordControllers_1 = require("../controller/passwordControllers");
//create a router for password
const passwordRouter = express_1.default.Router();
//create an endpoint to get all website names with password for particular user
passwordRouter.get("/all/:id", auth_1.default, passwordControllers_1.getAllPasswords);
//create an endpoint to decrypt specific encrypted password
passwordRouter.get("/specific/:id", auth_1.default, passwordControllers_1.decryptPassword);
//create an endpoint to create an website name with password
passwordRouter.post("/", auth_1.default, passwordControllers_1.createPassword);
//create an endpoint to update website and password data
passwordRouter.put("/:id", auth_1.default, passwordControllers_1.updatePassword);
//create an endpoint to delete website and password data
passwordRouter.delete("/:id", auth_1.default, passwordControllers_1.deletePassword);
exports.default = passwordRouter;
//# sourceMappingURL=passwordRoutes.js.map