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
const userModels_1 = __importDefault(require("../models/userModels"));
const bcrypt_1 = __importDefault(require("bcrypt"));
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
            const emailExist = yield userModels_1.default.findOne({ email: email });
            //check if user already registered or not
            if (emailExist) {
                //request could not be completed due to a conflict with the current state of the target resource
                res.status(409).json('Email Already Registered');
            }
            else {
                //hash the password
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                //create a user data in DB
                const userData = yield userModels_1.default.create({
                    userName: userName,
                    email: email,
                    password: hashedPassword
                });
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
    //taking user data from client
    const { email, password } = req.body;
    try {
        //validate input
        if (!email || !password) {
            //Bad request (400)
            return res.status(400).json('Enter Required Input Fields');
        }
        //validate email
        else if (!validator_1.default.isEmail(email)) {
            //400 - Bad request
            return res.status(400).json({ message: 'Invalid Email Address' });
        }
        else {
            const emailExist = yield userModels_1.default.findOne({ email: email });
            //check if user registered or not
            if (!emailExist) {
                return res.status(404).json({ message: 'Email Not Registered' });
            }
            else {
                //compare the password saved in DB and entered by user.
                const matchPassword = yield bcrypt_1.default.compare(password, emailExist.password);
                //if password doesn't match
                if (!matchPassword) {
                    //401 - unauthorised
                    return res.status(401).json({ message: 'Incorrect password' });
                }
                else {
                    const user = emailExist;
                    const { userName, email, password } = user;
                    //create a jwt token
                    const token = jsonwebtoken_1.default.sign({ email, id: user._id }, process.env.secretKey);
                    //create cookie for server.
                    return res.cookie('auth_cookie', { id: user._id,
                        userName: userName,
                        email: email,
                        token: token
                    }).status(200).json({ id: user._id, userName: userName, email: email, message: 'User logged-in successfully' });
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
    res.clearCookie('auth_cookie').json('logout');
};
exports.default = {
    register,
    login,
    logout
};
//# sourceMappingURL=authControllers.js.map