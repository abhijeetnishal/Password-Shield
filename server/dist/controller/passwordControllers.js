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
const passwordModel_1 = __importDefault(require("../models/passwordModel"));
const encryptDecrypt_1 = __importDefault(require("../utils/encryptDecrypt"));
const getAllPasswords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get user Id whose data need to get
    const userId = req.params.id;
    try {
        //find all data with that user Id 
        //display only website name and password only
        const data = yield passwordModel_1.default.find({ userId: userId }).select({ websiteName: 1, password: 1, _id: 0 });
        res.status(200).json(data);
    }
    catch (error) {
        //display error
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
const decryptPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get the password Id from req to decrypt
        const data = yield passwordModel_1.default.findOne({ _id: req.params.id });
        if (data === null)
            res.status(404).json('Not Found');
        else {
            const websiteName = data.websiteName;
            const password = data.password;
            const id = data._id;
            const iv = data.iv;
            const decryptedPassword = encryptDecrypt_1.default.decrypt(password, iv);
            res.status(200).json({ websiteName, decryptedPassword, id });
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
            //get user Id from cookies
            const userId = req.cookies.auth_cookie.id;
            //encrypt the password before storing to db
            const data = encryptDecrypt_1.default.encrypt(password);
            const encryptedPassword = data.encryptedData;
            const base64data = data.base64data;
            //store password in DB
            const newPassword = new passwordModel_1.default({
                websiteName: websiteName,
                password: encryptedPassword,
                iv: base64data,
                userId: userId
            });
            yield newPassword.save();
            res.status(201).json(newPassword);
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
        if (websiteName === '' || password === '') {
            //Bad request (400)
            res.status(400).json('Enter Required Input Fields');
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
            yield passwordModel_1.default.findByIdAndUpdate(passwordId, newPassword, { new: true });
            res.status(200).json(newPassword);
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
        //delete password with id
        const password = yield passwordModel_1.default.findByIdAndRemove(passwordId);
        res.status(200).json('Password Deleted');
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