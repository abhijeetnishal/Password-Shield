"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Encryption algorithm
const algorithm = "aes-256-cbc";
function getKey() {
    const originalKey = process.env.PRIVATE_KEY; // Replace with your key
    const hash = crypto_1.default.createHash("sha256");
    hash.update(originalKey);
    const key = hash.digest();
    return key;
}
function encrypt(message) {
    // Random 16 digit initialization vector
    const iv = crypto_1.default.randomBytes(16);
    // Encrypt the string using encryption algorithm, private key and initialization vector
    const key = getKey();
    const cipher = crypto_1.default.createCipheriv(algorithm, key, iv);
    let encryptedData = cipher.update(message, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    // Convert the initialization vector to base64 string
    const base64data = iv.toString("base64");
    return { encryptedData, base64data };
}
exports.encrypt = encrypt;
//# sourceMappingURL=encryption.js.map