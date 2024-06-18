"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWTToken = exports.generateJWTToken = exports.isValidEmail = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWTToken = (userDetails, options = {}) => {
    return jsonwebtoken_1.default.sign(userDetails, process.env.JWT_SECRET_KEY, options);
};
exports.generateJWTToken = generateJWTToken;
const verifyJWTToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
    }
    catch (error) {
        return false;
    }
};
exports.verifyJWTToken = verifyJWTToken;
const isValidEmail = (email) => {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};
exports.isValidEmail = isValidEmail;
//# sourceMappingURL=auth.js.map