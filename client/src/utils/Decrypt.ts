import crypto from "crypto";

function getKey() {
  const originalKey = process.env.NEXT_PUBLIC_PRIVATE_KEY as string; // Replace with your key
  const hash = crypto.createHash("sha256");
  hash.update(originalKey);

  const key = hash.digest();
  return key;
}

function decryptPassword(encryptedData: string, iv: string) {
  // Convert initialize vector from base64 to buffer
  const originalData = Buffer.from(iv, "base64");

  // Encryption algorithm
  const algorithm = "aes-256-cbc";

  // Decrypt the string using encryption algorithm and private key
  const key = getKey();
  const decipher = crypto.createDecipheriv(algorithm, key, originalData);

  let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
  decryptedData += decipher.final("utf-8");

  return decryptedData;
}

export default decryptPassword;
