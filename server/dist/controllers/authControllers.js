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
exports.login = exports.register = void 0;
const dbConnect_1 = require("../config/dbConnect");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = require("../utils/auth");
const user_1 = require("../services/user");
/*
1. Take user data: {first name, last name, email, phone(optional), password}
2. Now implement input validation.
3. Check user is already registered or not using email
4. If not registered then save data (with password encrypted) to DB.
5. Else return user already registered.
*/
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Required fields missing" });
        }
        // Validate email
        else if (!(0, auth_1.isValidEmail)(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }
        else {
            // Check email registered or not
            const emailExists = yield (0, user_1.getUserDetails)("email", email);
            if (emailExists) {
                return res.status(401).json({ message: "Email already registered" });
            }
            else {
                // Hash the password
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                // Create a user data in DB
                const { rows } = yield dbConnect_1.pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING _id, email", [name, email, hashedPassword]);
                // Create a jwt token
                const newUser = rows[0];
                const token = (0, auth_1.generateToken)({ _id: newUser._id, email: newUser.email });
                return res.status(201).json({
                    data: { token: token },
                    message: "User registered successfully",
                });
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error");
    }
});
exports.register = register;
/*
1. Take user data:{email, password}
2. Now implement input validation
3. Check if email is present or not in DB.
4. If not present, return user doesn't exist.
5. If present, then check password is matched or not if matched logged in, else password doesn't match.
6. Create a token using jwt for authentication and authorization.
*/
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Required fields missing" });
        }
        // Validate email
        else if (!(0, auth_1.isValidEmail)(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }
        else {
            const emailExists = yield (0, user_1.getUserDetails)("email", email);
            // Check if user registered or not
            if (!emailExists) {
                return res.status(404).json({ message: "Email not registered" });
            }
            else {
                // Compare the password saved in DB and entered by user.
                const matchPassword = yield bcryptjs_1.default.compare(password, emailExists.password);
                // If password doesn't match
                if (!matchPassword) {
                    return res.status(401).json({ message: "Incorrect password" });
                }
                else {
                    // Create a jwt token
                    const token = (0, auth_1.generateToken)({
                        _id: emailExists._id,
                        email: emailExists.email,
                    });
                    return res.status(200).json({
                        data: { token: token },
                        message: "User logged-in successfully",
                    });
                }
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.login = login;
//# sourceMappingURL=authControllers.js.map