import jwt from "jsonwebtoken";
// Define an interface for the decoded JWT payload
interface DecodedToken {
  _id?: string;
}

const generateToken = (payload: object, expiresIn: string | number = "1d") => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
};

const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY) as DecodedToken;
};

const isValidEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export { generateToken, verifyToken, isValidEmail };
