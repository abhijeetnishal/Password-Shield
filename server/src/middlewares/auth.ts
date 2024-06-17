import { NextFunction, Request, Response } from "express";
import { verifyJWTToken } from "../utils/auth";

// Define a custom interface that extends the Request interface with the _id property
interface AuthenticatedRequest extends Request {
  _id?: string; // Make it optional or provide a default value if needed
}

const isAuthenticated = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get access token from request header
    const token = req.header("auth-token");

    // Check token exists or not
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token is missing" });
    } else {
      // Check user is authenticated or not
      const decoded = verifyJWTToken(token);
      if (decoded) {
        req._id = decoded._id; // Assign the userId from the decoded token to req._id
        next();
      } else {
        return res.status(401).json({ message: "Invalid token" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Internal server error" });
  }
};

export default isAuthenticated;
