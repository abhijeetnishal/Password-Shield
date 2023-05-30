"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../utils/auth"));
const passwordControllers_1 = __importDefault(require("../controller/passwordControllers"));
const passwordRouter = express_1.default.Router();
passwordRouter.get('/all/:id', auth_1.default, passwordControllers_1.default.getAllPasswords);
passwordRouter.get('/specific/:id', auth_1.default, passwordControllers_1.default.decryptPassword);
passwordRouter.post('/', auth_1.default, passwordControllers_1.default.createPassword);
passwordRouter.put('/:id', auth_1.default, passwordControllers_1.default.updatePassword);
passwordRouter.delete('/:id', auth_1.default, passwordControllers_1.default.deletePassword);
exports.default = passwordRouter;
//# sourceMappingURL=passwordRoutes.js.map