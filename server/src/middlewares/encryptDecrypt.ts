//Hashed data can not be decrypted with a specific key, like encrypted data.

//crypto is a built-in library in Node.js. Thus it doesn’t require installation and configuration before 
//using it in your Node.js applications. The crypto module handles an algorithm that performs encryption 
//and decryption of data.

// include crypto module
import crypto from 'crypto'
 
// set encryption algorithm
const algorithm = 'aes-256-cbc'
 
import dotenv from 'dotenv'
dotenv.config();
// private key
const key = process.env.privateKey;
 
function encrypt(message: string){
        // random 16 digit initialization vector
        const iv: Buffer = crypto.randomBytes(16);

        // encrypt the string using encryption algorithm, private key and initialization vector
        const cipher = crypto.createCipheriv(algorithm, key, iv);

        let encryptedData = cipher.update(message, "utf-8", "hex");

        encryptedData += cipher.final("hex");

        // convert the initialization vector to base64 string
        const base64data = iv.toString('base64');

        return {encryptedData, base64data};
}

function decrypt(encryptedData: string, iv: string){
    // convert initialize vector from base64 to buffer
    const origionalData = Buffer.from(iv, 'base64');
    
    // decrypt the string using encryption algorithm and private key
    const decipher = crypto.createDecipheriv(algorithm, key, origionalData);
    
    let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
    
    decryptedData += decipher.final("utf-8");

    return decryptedData;
}

export default {encrypt, decrypt}