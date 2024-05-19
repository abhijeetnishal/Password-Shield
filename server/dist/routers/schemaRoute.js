"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schemas_1 = __importDefault(require("../models/schemas"));
const schemaRouter = express_1.default.Router();
// Endpoint for creating schemas.
schemaRouter.post("/schema", schemas_1.default);
exports.default = schemaRouter;
//# sourceMappingURL=schemaRoute.js.map