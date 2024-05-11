"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnect_1 = __importDefault(require("../config/dbConnect"));
const createSchemas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Connect to the PostgreSQL server
        // db.connect;
        // Create the schemas
        yield dbConnect_1.default.pool.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
            
            CREATE TABLE IF NOT EXISTS users (
                _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                timestamps TIMESTAMP DEFAULT NOW()
            );
            
            CREATE TABLE IF NOT EXISTS passwords (
                _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                websiteName VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                iv VARCHAR(255) NOT NULL,
                timestamps TIMESTAMP DEFAULT NOW(),
                createdBy UUID REFERENCES users(_id)
            )
            `);
        res.status(200).json('Schemas created successfully!');
    }
    catch (error) {
        console.error('Error creating schemas:', error);
        res.status(500).json('internal server error');
    }
});
exports.default = createSchemas;
//# sourceMappingURL=schemas.js.map