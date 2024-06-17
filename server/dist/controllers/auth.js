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
exports.resetPassword = exports.forgotPassword = exports.login = exports.register = void 0;
const dbConnect_1 = require("../config/dbConnect");
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = require("../utils/auth");
const user_1 = require("../services/user");
const emailConfig_1 = require("../config/emailConfig");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Required fields missing" });
        }
        if (!(0, auth_1.isValidEmail)(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }
        const emailExists = yield (0, user_1.getDetails)("email", email);
        if (emailExists) {
            return res.status(401).json({ message: "Email already registered" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Create new user
        const { rows } = yield dbConnect_1.pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING _id, email", [name, email, hashedPassword]);
        const newUser = rows[0];
        const token = (0, auth_1.generateJWTToken)({ _id: newUser._id, email: newUser.email });
        return res.status(201).json({
            data: { token: token },
            message: "User registered successfully",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Required fields missing" });
        }
        if (!(0, auth_1.isValidEmail)(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }
        const emailExists = yield (0, user_1.getDetails)("email", email);
        if (!emailExists) {
            return res.status(404).json({ message: "Email not registered" });
        }
        const matchPassword = yield bcryptjs_1.default.compare(password, emailExists.password);
        if (!matchPassword) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        const token = (0, auth_1.generateJWTToken)({
            _id: emailExists._id,
            email: emailExists.email,
        });
        return res.status(200).json({
            data: { token: token },
            message: "User logged-in successfully",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.login = login;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!(0, auth_1.isValidEmail)(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }
        const emailExists = yield (0, user_1.getDetails)("email", email);
        if (!emailExists) {
            return res.status(401).json({ message: "Email not registered" });
        }
        const resetPasswordToken = (0, auth_1.generateJWTToken)({ _id: emailExists._id, email: emailExists.email }, { expiresIn: "1h" });
        const resetPasswordLink = `${process.env.CLIENT_PROD_URL}/auth/reset-password?token=${resetPasswordToken}`;
        // Read the email template
        const templatePath = path_1.default.join(__dirname, "..", "templates", "passwordReset.html");
        const emailTemplate = yield promises_1.default.readFile(templatePath, { encoding: "utf8" });
        // Replace the placeholder with the actual reset link
        const htmlContent = emailTemplate.replace(/{{resetPasswordLink}}/g, resetPasswordLink);
        // Send the email
        yield emailConfig_1.transporter.sendMail({
            to: email,
            subject: "Password Reset Request",
            html: htmlContent,
        });
        return res.status(200).json({ message: "Reset password link sent" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const id = req._id;
    try {
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }
        const userExists = yield (0, user_1.getDetails)("_id", id);
        if (userExists) {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            yield dbConnect_1.pool.query("UPDATE users SET password = $1 WHERE _id = $2", [
                hashedPassword,
                id,
            ]);
            return res.status(200).json({ message: "Password reset successful" });
        }
        else {
            return res.status(401).json({ message: "User doesn't exist" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.resetPassword = resetPassword;
//# sourceMappingURL=auth.js.map