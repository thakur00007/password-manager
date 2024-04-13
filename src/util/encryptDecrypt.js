import crypto from "crypto";
const CRYPTO_KEY = process.env.CRYPTO_KEY;

const deriveKeyFromPassphrase = (passphrase, keyLength) => {
  return crypto.scryptSync(passphrase, "salt", keyLength / 8);
};

const encryptData = (data) => {
  const key = deriveKeyFromPassphrase(CRYPTO_KEY, 256);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encryptedData = cipher.update(data);
  encryptedData = Buffer.concat([encryptedData, cipher.final()]);
  return {
    encryptedData: encryptedData,
    iv: iv,
  };
};

const decryptData = (encryptedData, iv) => {
  const key = deriveKeyFromPassphrase(CRYPTO_KEY, 256);
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  let decryptedData = decipher.update(encryptedData);
  decryptedData = Buffer.concat([decryptedData, decipher.final()]);
  return decryptedData.toString();
};

export { encryptData, decryptData };
