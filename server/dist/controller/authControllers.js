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
const dbConnect_1 = __importDefault(require("../models/dbConnect"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validator_1 = __importDefault(require("validator"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/*
1. Take user data: {first name, last name, email, phone(optional), password}
2. Now implement input validation.
3. Check user is already registered or not using email
4. If not registered then save data (with passsword encrypted) to DB.
5. Else return user already registered.
*/
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //taking user data from client
    const { userName, email, password } = req.body;
    //using try catch for error handling
    try {
        //connect the DB
        dbConnect_1.default.connect;
        //validate input
        if (!userName || !email || !password) {
            //Bad request (400)
            res.status(400).json('Enter Required Input Fields');
        }
        //validate email
        else if (!validator_1.default.isEmail(email)) {
            //400 - Bad request
            res.status(400).json('Invalid Email Address');
        }
        else {
            // Execute a SELECT query to check if the email exists
            //The rows property typically represents the result of the query, containing the returned rows from the database.
            const { rows } = yield dbConnect_1.default.client.query('SELECT email FROM users WHERE email = $1', [email]);
            //check if rows length is zero or not, if zero means no data is present
            const emailExists = rows.length;
            //check if user already registered or not
            if (emailExists) {
                //request could not be completed due to a conflict with the current state of the target resource
                res.status(409).json('Email Already Registered');
            }
            else {
                //hash the password
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                //create a user data in DB
                yield dbConnect_1.default.client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [userName, email, hashedPassword]);
                //created(201)
                res.status(201).json("User Registered Successfully");
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json('Internal Server Error');
    }
});
/*
1. Take user data:{email, password}
2. Now implement input validation
3. Check if email is present or not in DB.
4. If not present, return user doesn't exist.
5. If present, then check password is matched or not if matched logged in, else password doesn't match.
6. Create a token using jwt for authentication and autherization.
*/
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    //taking user data from client
    const { email, password } = req.body;
    try {
        //connect the DB
        dbConnect_1.default.connect;
        //validate input
        if (!email || !password) {
            //Bad request (400)
            res.status(400).json('Enter Required Input Fields');
        }
        //validate email
        else if (!validator_1.default.isEmail(email)) {
            //400 - Bad request
            res.status(400).json({ message: 'Invalid Email Address' });
        }
        else {
            // Execute a SELECT query to check if the email exists
            const { rows } = yield dbConnect_1.default.client.query('SELECT email FROM users WHERE email = $1', [email]);
            // The result.rows[0].exists value will be true if the email exists, false otherwise
            const emailExists = rows.length;
            //check if user registered or not
            if (!emailExists) {
                res.status(404).json({ message: 'Email Not Registered' });
            }
            else {
                // Execute a SELECT query to get the password of the user with the given email
                const result = yield dbConnect_1.default.client.query('SELECT password FROM users WHERE email = $1', [email]);
                // Return the password if a matching user is found, otherwise return null
                const dbPassword = (yield ((_a = result.rows[0]) === null || _a === void 0 ? void 0 : _a.password)) || null;
                //compare the password saved in DB and entered by user.
                const matchPassword = yield bcryptjs_1.default.compare(password, dbPassword);
                //if password doesn't match
                if (!matchPassword) {
                    //401 - unauthorised
                    res.status(401).json({ message: 'Incorrect password' });
                }
                else {
                    // Execute a SELECT query to get the id of the user with the given email
                    const result = yield dbConnect_1.default.client.query('SELECT _id FROM users WHERE email = $1', [email]);
                    const userId = (yield ((_b = result.rows[0]) === null || _b === void 0 ? void 0 : _b._id)) || null;
                    //create a jwt token
                    const token = jsonwebtoken_1.default.sign({ id: userId }, process.env.secretKey);
                    //create cookie for server.
                    res.cookie('auth_cookie', { _id: userId,
                        email: email,
                        token: token
                    }, { httpOnly: true }).status(200).json({ _id: userId, email: email, message: 'User logged-in successfully' });
                }
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json('Internal Server Error');
    }
});
//Clear the cookie to logout
const logout = (req, res) => {
    res.clearCookie('auth_cookie').json('user logged out');
};
exports.default = {
    register,
    login,
    logout
};
//# sourceMappingURL=authControllers.js.map