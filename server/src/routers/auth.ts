import express from "express";
import { pool } from "../config/dbConnect";
import { Request, Response } from "express";

import {
  register,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/auth";
import isAuthenticated from "../middlewares/auth";

const emailVerifiedTemplate = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Email Verified</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 20px;
        }
        .container {
          background-color: #ffffff;
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #4caf50;
          text-align: center;
        }
        p {
          font-size: 16px;
          color: #333;
        }
        .button-container {
          text-align: center;
          margin-top: 20px;
        }
        a.button {
          background-color: #4caf50;
          color: white;
          padding: 12px 20px;
          text-decoration: none;
          border-radius: 5px;
        }
        a.button:hover {
          background-color: #45a049;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Email Verified Successfully!</h1>
        <p>Hello,</p>
        <p>Your email has been successfully verified. You can now access your account and enjoy all the features of our app.</p>
        <p>If you did not perform this action, please contact our support team immediately.</p>
        <div class="button-container">
          <a href="http://localhost:3000/auth/login" class="button">Go to Login</a>
        </div>
        <p>Best regards,<br />Your App Name Team</p>
      </div>
    </body>
  </html>
`;


const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/forgot-password", forgotPassword);

authRouter.post("/reset-password", isAuthenticated, resetPassword);

authRouter.get("/:id/verify/:token", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const tokenParam = req.params.token;

    // 1. Check if the user exists
    const userQuery = `
      SELECT * FROM users WHERE _id = $1;
    `;
    const userResult = await pool.query(userQuery, [userId]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "Invalid link: user not found" });
    }

    const user = userResult.rows[0];

    // 2. Check if the token exists
    const tokenQuery = `
      SELECT * FROM tokens WHERE user_id = $1 AND token = $2;
    `;
    const tokenResult = await pool.query(tokenQuery, [userId, tokenParam]);

    if (tokenResult.rows.length === 0) {
      return res.status(400).json({ message: "Invalid link: token not found" });
    }

    // 3. Check if user is already verified
    if (user.verified) {
      return res.status(200).json({
        message: "User already verified",
      });
    }

    // 4. Mark the user as verified
    const updateUserQuery = `
      UPDATE users SET verified = true WHERE _id = $1;
    `;
    await pool.query(updateUserQuery, [userId]);

    return res.status(200).send(emailVerifiedTemplate)

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error, please try again later.",
    });
  }
});

export default authRouter;
