import { pool } from "../config/dbConnect";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { generateToken, verifyToken, isValidEmail } from "../utils/auth";
import { getDetails } from "../services/user";
import nodemailer from "nodemailer"

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/*
1. Take user data: {first name, last name, email, phone(optional), password}
2. Now implement input validation.
3. Check user is already registered or not using email
4. If not registered then save data (with password encrypted) to DB.
5. Else return user already registered.
*/
const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Validate email
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    } 

    // Check email registered or not
    const emailExists = await getDetails("email", email);
    if (emailExists) {
      return res.status(401).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a user data in DB
    const { rows } = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING _id, email",
      [name, email, hashedPassword]
    );

    // Create a jwt token
    const newUser = rows[0];
    const token = generateToken({ _id: newUser._id, email: newUser.email });

    return res.status(201).json({
      data: { token: token },
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/*
1. Take user data: {email, password}
2. Now implement input validation
3. Check if email is present or not in DB.
4. If not present, return user doesn't exist.
5. If present, then check password is matched or not if matched logged in, else password doesn't match.
6. Create a token using jwt for authentication and authorization.
*/
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Validate email
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const emailExists = await getDetails("email", email);
    // Check if user registered or not
    if (!emailExists) {
      return res.status(404).json({ message: "Email not registered" });
    }

    // Compare the password saved in DB and entered by user.
    const matchPassword = await bcrypt.compare(password, emailExists.password);
    // If password doesn't match
    if (!matchPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Create a jwt token
    const token = generateToken({
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

/*
1. Take user email
2. Validate email
3. Generate a token with 1-hour expiry
4. Send token to user's email
*/
const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    } 
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const user = await getDetails("email", email);
    if (!user) {
      return res.status(401).json({ message: "Email not registered" });
    }

    const token = generateToken({ _id: user._id, email: user.email }); 
    const resetLink = `${process.env.RESET_PASSWORD_URL}/reset-password?token=${token}`;

    // Send email
    await transporter.sendMail({
      to: email,
      subject: 'Password Reset Request',
      text: `Click the following link to reset your password: ${resetLink}`,
      html: `<p>Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
    });

    return res.status(200).json({ message: "Password reset link sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/*
1. Take token and new password
2. Validate token
3. Hash new password and update in DB
4. Return success message
*/
const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;

  try {
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("UPDATE users SET password = $1 WHERE _id = $2", [hashedPassword, decoded._id]);

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { register, login, forgotPassword, resetPassword };
