import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import passwordModel from "../models/passwordModel";
import encryptDecrypt from "../utils/encryptDecrypt";

const getAllPasswords = async (req: Request, res: Response)=>{
    //get user Id whose data need to get
    const userId = req.params.id;

    try{
        //find all data with that user Id 
        //display only website name and password only
        const data = await passwordModel.find({userId: userId}).select({ websiteName: 1, password: 1, _id: 0 });
        res.status(200).json(data);
    }
    catch(error){
        //display error
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

const decryptPassword = async (req: Request, res: Response)=>{
    try{
        //get the password Id from req to decrypt
        const data = await passwordModel.findOne({_id: req.params.id});

        if(data === null)
            res.status(404).json('Not Found');

        else{
            const websiteName = data.websiteName;
            const password = data.password;
            const id = data._id;
            const iv = data.iv;
    
            const decryptedPassword = encryptDecrypt.decrypt(password, iv);
    
            res.status(200).json({websiteName, decryptedPassword, id});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal Server Error"});
    }
}

const createPassword = async (req: Request, res: Response)=>{
    //get data from client
    const {websiteName, password} = req.body;

    try{
        if(!websiteName || !password){
            //Bad request (400)
            res.status(400).json('Enter Required Input Fields');
        }
        else{
            //get user Id from cookies
            const userId = req.cookies.auth_cookie.id;

            //encrypt the password before storing to db
            const data = encryptDecrypt.encrypt(password);
            const encryptedPassword = data.encryptedData;
            const base64data = data.base64data;

            //store password in DB
            const newPassword = new passwordModel({
                websiteName: websiteName,
                password: encryptedPassword,
                iv: base64data,
                userId: userId
            });

            await newPassword.save();
            res.status(201).json(newPassword);
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

const updatePassword = async (req: Request, res: Response)=>{
    const passwordId = req.params.id;
    const {websiteName, password} = req.body;

    try{
        if(websiteName === '' || password === ''){
            //Bad request (400)
            res.status(400).json('Enter Required Input Fields');
        }
        else{
            //get user Id from cookies
            const userId = req.cookies.auth_cookie.id;

            //encrypt the password before storing to db
            const data = encryptDecrypt.encrypt(password);
            const encryptedPassword = data.encryptedData;
            const base64data = data.base64data;

            const newPassword ={
                websiteName: websiteName,
                password: encryptedPassword,
                iv: base64data,
                userId: userId
            }

            //update password in DB
            await passwordModel.findByIdAndUpdate(passwordId, newPassword, {new: true});
            res.status(200).json(newPassword);
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

const deletePassword = async (req: Request, res: Response)=>{
    //get password Id
    const passwordId = req.params.id;
    
    try{
        //delete password with id
        const password = await passwordModel.findByIdAndRemove(passwordId);
        res.status(200).json('Password Deleted');
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export default {
    getAllPasswords,
    decryptPassword,
    createPassword,
    updatePassword,
    deletePassword
}