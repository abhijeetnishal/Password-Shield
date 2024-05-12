import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

// set encryption algorithm
const algorithm = "aes-256-cbc";

function getKey() {
  const originalKey = process.env.PRIVATE_KEY; // Replace with your key
  const hash = crypto.createHash("sha256");
  hash.update(originalKey);

  const key = hash.digest();
  return key;
}

function encrypt(message: string) {
  // random 16 digit initialization vector
  const iv: Buffer = crypto.randomBytes(16);

  // encrypt the string using encryption algorithm, private key and initialization vector
  const key = getKey();
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encryptedData = cipher.update(message, "utf-8", "hex");
  encryptedData += cipher.final("hex");

  // convert the initialization vector to base64 string
  const base64data = iv.toString("base64");

  return { encryptedData, base64data };
}

function decrypt(encryptedData: string, iv: string) {
  // convert initialize vector from base64 to buffer
  const originalData = Buffer.from(iv, "base64");

  // decrypt the string using encryption algorithm and private key
  const key = getKey();
  const decipher = crypto.createDecipheriv(algorithm, key, originalData);

  let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
  decryptedData += decipher.final("utf-8");

  return decryptedData;
}

export { encrypt, decrypt };
