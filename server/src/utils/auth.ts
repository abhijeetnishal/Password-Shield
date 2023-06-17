import jwt from "jsonwebtoken";

import dotenv from 'dotenv';
import { NextFunction, Request, Response } from "express";
dotenv.config();

const isAuthenticated = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        //get token from cookie 
        const token = req.cookies.auth_cookie.token;
        const isAuth = jwt.verify(token, process.env.secretKey);
        if(isAuth){
            next();
        }
        else{
            return res.status(401).json({message: 'user not authenticated'});
        }
    }
    catch(error){
        //console.log(error);
        return res.status(401).json({message: 'Internal server error'});
    }
}

export default isAuthenticated;