"use strict";
//Hashed data can not be decrypted with a specific key, like encrypted data.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
//crypto is a built-in library in Node.js. Thus it doesn’t require installation and configuration before
//using it in your Node.js applications. The crypto module handles an algorithm that performs encryption
//and decryption of data.
// include crypto module
const crypto_1 = __importDefault(require("crypto"));
// set encryption algorithm
const algorithm = "aes-256-cbc";
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// private key
const key = process.env.PRIVATE_KEY;
function encrypt(message) {
    // random 16 digit initialization vector
    const iv = crypto_1.default.randomBytes(16);
    // encrypt the string using encryption algorithm, private key and initialization vector
    const cipher = crypto_1.default.createCipheriv(algorithm, key, iv);
    let encryptedData = cipher.update(message, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    // convert the initialization vector to base64 string
    const base64data = iv.toString("base64");
    return { encryptedData, base64data };
}
exports.encrypt = encrypt;
function decrypt(encryptedData, iv) {
    // convert initialize vector from base64 to buffer
    const originalData = Buffer.from(iv, "base64");
    // decrypt the string using encryption algorithm and private key
    const decipher = crypto_1.default.createDecipheriv(algorithm, key, originalData);
    let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
    decryptedData += decipher.final("utf-8");
    return decryptedData;
}
exports.decrypt = decrypt;
//# sourceMappingURL=encryptDecrypt.js.map