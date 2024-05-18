import { pool } from "../config/dbConnect";
import bcrypt from "bcryptjs";

import { Request, Response } from "express";
import { generateToken, isValidEmail } from "../utils/auth";
import { getUserDetails } from "../services/user";

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
    else if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    } else {
      // Check email registered or not
      const emailExists = await getUserDetails("email", email);

      if (emailExists) {
        return res.status(401).json({ message: "Email already registered" });
      } else {
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
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

/*
1. Take user data:{email, password}
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
    else if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    } else {
      const emailExists = await getUserDetails("email", email);

      // Check if user registered or not
      if (!emailExists) {
        return res.status(404).json({ message: "Email not registered" });
      } else {
        // Compare the password saved in DB and entered by user.
        const matchPassword = await bcrypt.compare(
          password,
          emailExists.password
        );

        // If password doesn't match
        if (!matchPassword) {
          return res.status(401).json({ message: "Incorrect password" });
        } else {
          // Create a jwt token
          const token = generateToken({
            _id: emailExists._id,
            email: emailExists.email,
          });

          return res.status(200).json({
            data: { token: token },
            message: "User logged-in successfully",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { register, login };
