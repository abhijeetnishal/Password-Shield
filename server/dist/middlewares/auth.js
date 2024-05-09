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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get token from cookie 
        const cookie = req.cookies.auth_cookie;
        if (cookie) {
            //check user is authenticated or not
            const isAuth = jsonwebtoken_1.default.verify(cookie.token, process.env.secretKey);
            if (isAuth) {
                next();
            }
            else {
                return res.status(401).json({ message: 'user not authenticated' });
            }
        }
        else {
            return res.status(401).json({ message: 'user not authenticated' });
        }
    }
    catch (error) {
        //console.log(error);
        return res.status(401).json({ message: 'Internal server error' });
    }
});
exports.default = isAuthenticated;
//# sourceMappingURL=auth.js.map