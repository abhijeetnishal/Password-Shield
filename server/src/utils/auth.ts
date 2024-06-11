import jwt from "jsonwebtoken";

// Define an interface for the decoded JWT payload
interface DecodedToken {
  _id?: string;
}

const generateToken = (userDetails: any) => {
  return jwt.sign(userDetails, process.env.JWT_SECRET_KEY);
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
