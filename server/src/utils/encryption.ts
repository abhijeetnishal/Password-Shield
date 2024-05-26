import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

// Encryption algorithm
const algorithm = "aes-256-cbc";

function getKey() {
  const originalKey = process.env.PRIVATE_KEY; // Replace with your key
  const hash = crypto.createHash("sha256");
  hash.update(originalKey);

  const key = hash.digest();
  return key;
}

function encrypt(message: string) {
  // Random 16 digit initialization vector
  const iv: Buffer = crypto.randomBytes(16);

  // Encrypt the string using encryption algorithm, private key and initialization vector
  const key = getKey();
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encryptedData = cipher.update(message, "utf-8", "hex");
  encryptedData += cipher.final("hex");

  // Convert the initialization vector to base64 string
  const base64data = iv.toString("base64");

  return { encryptedData, base64data };
}

export { encrypt };
