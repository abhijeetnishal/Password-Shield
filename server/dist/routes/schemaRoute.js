"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import express to use router method
const express_1 = __importDefault(require("express"));
//express.Router() is a method in the Express.js that creates a new router object.
//It is used to define routes for a specific endpoint.
const schemaRouter = express_1.default.Router();
const schemas_1 = __importDefault(require("../models/schemas"));
//create endpoint for creating schemas.
schemaRouter.post('/schema', schemas_1.default);
exports.default = schemaRouter;
//# sourceMappingURL=schemaRoute.js.map