"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = exports.isValidEmail = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userDetails) => {
    return jsonwebtoken_1.default.sign(userDetails, process.env.JWT_SECRET_KEY);
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
};
exports.verifyToken = verifyToken;
const isValidEmail = (email) => {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Test the email against the pattern
    return emailPattern.test(email);
};
exports.isValidEmail = isValidEmail;
//# sourceMappingURL=auth.js.map