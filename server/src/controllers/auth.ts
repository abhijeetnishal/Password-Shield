import { pool } from "../config/dbConnect";
import path from "path";
import fs from "fs/promises";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { isValidEmail, generateJWTToken } from "../utils/auth";
import { getDetails } from "../services/user";
import { transporter } from "../config/emailConfig";
import { getHtmlTemplate } from "../utils/template";
import crypto from "crypto";

// Define a custom interface that extends the Request interface with the _id property
interface AuthenticatedRequest extends Request {
  _id?: string; // Make it optional or provide a default value if needed
}

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const emailExists = await getDetails("email", email);
    if (emailExists) {
      return res.status(401).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const { rows } = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING _id, email",
      [name, email, hashedPassword]
    );

    const newUser = rows[0];
    const token = generateJWTToken({ _id: newUser._id, email: newUser.email });
    

    const tokenEmail = crypto.randomBytes(32).toString("hex");

    // Insert the token into the token table with an expiry time (e.g., 1 hour)
    const insertTokenQuery = `
      INSERT INTO tokens (user_id, token, created_at)
      VALUES ($1, $2, NOW())
    `;
    await pool.query(insertTokenQuery, [newUser._id, tokenEmail]);

    // Generate verification URL
    const url = `http://localhost:8080/auth/v1/${newUser._id}/verify/${tokenEmail}`;
    console.log(url);

    // Send verification email
    await transporter.sendMail({
      to: newUser.email,
      subject: "Verification request",
      text: `Click on the link to verify your email: ${url}`,
    });

    return res.status(201).json({
      data: { token: token ,
        newUser: newUser,

      },
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const emailExists = await getDetails("email", email);

    if (!emailExists) {
      return res.status(404).json({ message: "Email not registered" });
    }

    const matchPassword = await bcrypt.compare(password, emailExists.password);
    if (!matchPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = generateJWTToken({
      _id: emailExists._id,
      email: emailExists.email,
    });

    return res.status(200).json({
      data: { token: token },
      message: "User logged-in successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const emailExists = await getDetails("email", email);
    if (!emailExists) {
      return res.status(401).json({ message: "Email not registered" });
    }

    const resetPasswordToken = generateJWTToken(
      { _id: emailExists._id, email: emailExists.email },
      { expiresIn: "1h" }
    );

    const resetPasswordLink = `${process.env.CLIENT_PROD_URL}/auth/reset-password?token=${resetPasswordToken}`;

    // Read the email template
    const templatePath = path.join(
      __dirname,
      "..",
      "templates",
      "passwordReset.html"
    );
    const emailTemplate = await fs.readFile(templatePath, { encoding: "utf8" });

    // Replace the placeholder with the actual reset link
    const htmlContent = emailTemplate.replace(
      /{{resetPasswordLink}}/g,
      resetPasswordLink
    );

    // Send the email
    await transporter.sendMail({
      to: email,
      subject: "Password Reset Request",
      html: htmlContent,
    });

    return res.status(200).json({ message: "Reset password link sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const resetPassword = async (req: AuthenticatedRequest, res: Response) => {
  const { password } = req.body;
  const id = req._id;

  try {
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const userExists = await getDetails("_id", id);
    if (userExists) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query("UPDATE users SET password = $1 WHERE _id = $2", [
        hashedPassword,
        id,
      ]);

      return res.status(200).json({ message: "Password reset successful" });
    } else {
      return res.status(401).json({ message: "User doesn't exist" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { register, login, forgotPassword, resetPassword };
