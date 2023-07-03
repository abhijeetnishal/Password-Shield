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
const express_1 = require("express");
const encryptDecrypt_1 = __importDefault(require("../utils/encryptDecrypt"));
const auth_1 = __importDefault(require("../utils/auth"));
const dbConnect_1 = __importDefault(require("../models/dbConnect"));
const getAllPasswords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get user Id whose data need to get
    const userId = req.params.id;
    try {
        if (auth_1.default) {
            const { rows } = yield dbConnect_1.default.client.query(`SELECT * FROM passwords WHERE createdBy = $1`, [userId]);
            if (rows.length === 0)
                res.status(404).json('passwords not found');
            else
                res.status(200).json(rows);
        }
        else {
            express_1.response.status(403).json('user not authenticated');
        }
    }
    catch (error) {
        //display error
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
const decryptPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get the password Id from req to decrypt
    const id = req.params.id;
    try {
        if (auth_1.default) {
            const { rows } = yield dbConnect_1.default.client.query(`SELECT * FROM passwords WHERE _id = $1`, [id]);
            if (rows.length === 0)
                res.status(404).json('Not Found');
            else {
                const websiteName = rows[0].websitename;
                const password = rows[0].password;
                const id = rows[0]._id;
                const iv = rows[0].iv;
                const decryptedPassword = encryptDecrypt_1.default.decrypt(password, iv);
                res.status(200).json({ websiteName, decryptedPassword, id });
            }
        }
        else {
            express_1.response.status(403).json('user not authenticated');
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal Server Error" });
    }
});
const createPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get data from client
    const { websiteName, password } = req.body;
    try {
        if (!websiteName || !password) {
            //Bad request (400)
            res.status(400).json('Enter Required Input Fields');
        }
        else {
            if (auth_1.default) {
                //get user Id from cookies
                const userId = req.cookies.auth_cookie._id;
                //encrypt the password before storing to db
                const data = encryptDecrypt_1.default.encrypt(password);
                const encryptedPassword = data.encryptedData;
                const base64data = data.base64data;
                //store password in DB
                const newPassword = {
                    websiteName: websiteName,
                    password: encryptedPassword,
                    iv: base64data,
                };
                const result = yield dbConnect_1.default.client.query(`INSERT INTO passwords(websiteName, password, iv, createdBy) 
                    VALUES($1, $2, $3, $4)`, [websiteName, encryptedPassword, base64data, userId]);
                res.status(201).json(newPassword);
            }
            else {
                res.status(403).json('user not authenticated');
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordId = req.params.id;
    const { websiteName, password } = req.body;
    try {
        if (auth_1.default) {
            if (websiteName === '' || password === '') {
                //Bad request (400)
                res.status(400).json('Enter Required Input Fields');
            }
            else {
                const { rows } = yield dbConnect_1.default.client.query(`SELECT * FROM passwords WHERE _id = $1`, [passwordId]);
                if (rows.length === 0) {
                    res.status(404).json('not found');
                }
                else {
                    //get user Id from cookies
                    const userId = req.cookies.auth_cookie.id;
                    //encrypt the password before storing to db
                    const data = encryptDecrypt_1.default.encrypt(password);
                    const encryptedPassword = data.encryptedData;
                    const base64data = data.base64data;
                    const newPassword = {
                        websiteName: websiteName,
                        password: encryptedPassword,
                        iv: base64data,
                        userId: userId
                    };
                    //update password in DB
                    yield dbConnect_1.default.client.query(`UPDATE passwords SET websitename = $1, password = $2, iv = $3 WHERE _id = $4`, [websiteName, encryptedPassword, base64data, passwordId]);
                    res.status(200).json(newPassword);
                }
            }
        }
        else {
            res.status(403).json('user not authenticated');
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
const deletePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get password Id
    const passwordId = req.params.id;
    try {
        if (auth_1.default) {
            const { rows } = yield dbConnect_1.default.client.query(`SELECT * FROM passwords WHERE _id = $1`, [passwordId]);
            if (rows.length === 0) {
                res.status(404).json('not found');
            }
            else {
                //delete password with id
                yield dbConnect_1.default.client.query(`DELETE FROM passwords WHERE _id = $1`, [passwordId]);
                res.status(200).json('Password Deleted With id: ' + passwordId);
            }
        }
        else {
            res.status(403).json('user not authenticated');
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.default = {
    getAllPasswords,
    decryptPassword,
    createPassword,
    updatePassword,
    deletePassword
};
//# sourceMappingURL=passwordControllers.js.map