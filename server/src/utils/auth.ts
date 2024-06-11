import jwt from "jsonwebtoken";

// Define an interface for the decoded JWT payload
interface DecodedToken {
  _id?: string;
}
//updated so that reset password token can get expired by certain time 
const generateToken = (userDetails: any, options: jwt.SignOptions = {}) => {
  return jwt.sign(userDetails, process.env.JWT_SECRET_KEY, options);
};

const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY) as DecodedToken;
};

const isValidEmail = (email: string): boolean => {
  // Regular expression pattern for email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the pattern
  return emailPattern.test(email);
};

export { isValidEmail, generateToken, verifyToken };
