import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const isAuthenticated = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        //get token from cookie 
        const cookie = req.cookies.auth_cookie;


        if(cookie){
            //check user is authenticated or not
            const isAuth = jwt.verify(cookie.token, process.env.SECRET_KEY);
            if(isAuth){
                next();
            }
            else{
                return res.status(401).json({message: 'user not authenticated'});
            }
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