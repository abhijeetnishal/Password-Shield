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
//Mongoose is an object data modeling (ODM) library for MongoDB and Node.js.
const mongoose_1 = __importDefault(require("mongoose"));
//configure dotenv to access secret keys
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//Create and export a function to house the connection:
const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    //import url from .env file
    const url = process.env.DB_URL;
    //use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
    mongoose_1.default.connect(url)
        //Use a then catch block to show if the connection was successful or not:
        .then(() => {
        console.log("Successfully connected to MongoDB Database");
    })
        .catch((error) => {
        console.log("Unable to connect to MongoDB Database");
        console.error(error);
    });
});
//export the dbConnect method to use in main index.ts file
exports.default = dbConnect;
//# sourceMappingURL=dbConnect.js.map