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
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../utils/auth");
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get access token from request header
        const token = req.header("auth-token");
        // Check token exists or not
        if (!token) {
            return res
                .status(401)
                .json({ message: "Authentication token is missing" });
        }
        else {
            // Check user is authenticated or not
            const decoded = (0, auth_1.verifyToken)(token);
            if (decoded) {
                req._id = decoded._id; // Assign the userId from the decoded token to req._id
                next();
            }
            else {
                return res.status(401).json({ message: "Invalid token" });
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Internal server error" });
    }
});
exports.default = isAuthenticated;
//# sourceMappingURL=auth.js.map