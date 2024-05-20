import db from "../config/dbConnect";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
const nodemailer = require('nodemailer');

/*
1. Take user data: {first name, last name, email, phone(optional), password}
2. Now implement input validation.
3. Check user is already registered or not using email
4. If not registered then save data (with password encrypted) to DB.
5. Else return user already registered.
*/
const register = async (req: Request, res: Response) => {
  //taking user data from client
  const { userName, email, password } = req.body;

  //using try catch for error handling
  try {
    //connect the DB
    // await db.connect;
    //validate input
    if (!userName || !email || !password) {
      //Bad request (400)
      res.status(400).json("Enter Required Input Fields");
    }
    //validate email
    else if (!validator.isEmail(email)) {
      //400 - Bad request
      res.status(400).json("Invalid Email Address");
    } else {
      // Execute a SELECT query to check if the email exists
      //The rows property typically represents the result of the query, containing the returned rows from the database.
      const { rows } = await db.pool.query(
        "SELECT email FROM users WHERE email = $1",
        [email]
      );

      //check if rows length is zero or not, if zero means no data is present
      const emailExists = rows.length;

      //check if user already registered or not
      if (emailExists) {
        //request could not be completed due to a conflict with the current state of the target resource
        res.status(409).json("Email Already Registered");
      } else {
        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create a user data in DB
        await db.pool.query(
          "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
          [userName, email, hashedPassword]
        );

        //created(201)
        res.status(201).json("User Registered Successfully");
      }
    }
  } catch (error) {

    console.log(error);
    res.status(500).json("Internal Server Error");
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
  //taking user data from client
  const { email, password } = req.body;

  try {
    //connect the DB
    // db.connect;

    //validate input
    if (!email || !password) {
      //Bad request (400)
      res.status(400).json("Enter Required Input Fields");
    }
    //validate email
    else if (!validator.isEmail(email)) {
      //400 - Bad request
      res.status(400).json({ message: "Invalid Email Address" });
    } else {
      // Execute a SELECT query to check if the email exists
      const { rows } = await db.pool.query(
        "SELECT email FROM users WHERE email = $1",
        [email]
      );

      // The result.rows[0].exists value will be true if the email exists, false otherwise
      const emailExists = rows.length;

      //check if user registered or not
      if (!emailExists) {
        res.status(404).json({ message: "Email Not Registered" });
      } else {
        // Execute a SELECT query to get the password of the user with the given email
        const result = await db.pool.query(
          "SELECT password FROM users WHERE email = $1",
          [email]
        );

        // Return the password if a matching user is found, otherwise return null
        const dbPassword = (await result.rows[0]?.password) || null;

        //compare the password saved in DB and entered by user.
        const matchPassword = await bcrypt.compare(password, dbPassword);

        //if password doesn't match
        if (!matchPassword) {
          //401 - unauthorized
          res.status(401).json({ message: "Incorrect password" });
        } else {
          // Execute a SELECT query to get the id of the user with the given email
          const { rows } = await db.pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
          );

          const userId = rows[0]._id;

          const userName = rows[0].username;

          //create a jwt token
          const token = jwt.sign({ id: userId }, process.env.SECRET_KEY);

          //create cookie for server.
          res
            .cookie(
              "auth_cookie",
              { _id: userId, token: token },
              { sameSite: "none", secure: true }
            )
            .status(200)
            .json({
              _id: userId,
              userName: userName,
              message: "User logged-in successfully",
            });
          }
        }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

const sendPasswordResetEmail = async (req: Request, res: Response) => {
  try {
    const {email}=req.body;
    
    const result = await db.pool.query(
      "SELECT email FROM public.users WHERE email = $1",
      [email]
    );
   
    if(result.rowCount==0){
      res.json({status:false,error:false});
      console.log(result,"result");
      return;
    }
    const resetLink=process.env.CLIENT_PROD_URL+`/resetpassword?email=${email}`;

    // Create transporter
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS, // Your email address
        pass: process.env.GOOGLE_APP_PASSWORD, // Your email password or application-specific password
      },
    });
    
    // Define email options
    let mailOptions = {
      from:process.env.EMAIL_ADDRESS, // Sender name and address
      to: email, // Recipient email address
      subject: 'Password Reset', // Email subject
      html: `<p>You have requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.json({status:true,error:false})
    console.log('Password reset email sent successfully.');
  } catch (error) {
  res.json({status:false,"error":true})
    console.error('Error sending password reset email: ', error);
  }
};
const resetpassword=async (req: Request, res: Response)=>{
  const { email,password } = req.body;
      // Execute a SELECT query to check if the email exists
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.pool.query(
          "UPDATE users SET password = $1 WHERE email = $2",
          [hashedPassword, email]
        );
       
        if (result.rowCount === 0) {
          res.status(404).json({ message: "Email not found" ,status:false,error:false});
          return;
        }
      
        res.status(200).json({ message: "Password updated successfully",status:true,error:false });
      } catch (error) {
        console.error("Error updating password: ", error);
        res.status(500).json({ message: "Internal Server Error",status:false,error:true });
      }
  
}

//Clear the cookie to logout
const logout = (req: Request, res: Response) => {
  res.clearCookie("auth_cookie").json("user logged out");
};

export { register, login, logout,resetpassword,sendPasswordResetEmail };
