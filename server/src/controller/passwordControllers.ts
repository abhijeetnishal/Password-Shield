import { Request, Response } from "express";
import { decrypt, encrypt } from "../middlewares/encryptDecrypt";
import db from "../config/dbConnect";

const getAllPasswords = async (req: Request, res: Response) => {
  //get user Id whose data need to get
  const userId = req.params.id;
  try {
    // db.connect;
    //get data from DB
    const { rows } = await db.pool.query(
      `SELECT * FROM passwords WHERE createdBy = $1`,
      [userId]
    );
    //check if data contains any value or not
    if (rows.length === 0) return res.status(200).json({});
    else {
      //return the data
      return res.status(200).json(rows);
    }
  } catch (error) {
    //display error
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const decryptPassword = async (req: Request, res: Response) => {
  //get the password Id from req to decrypt
  const passwordId = req.params.id;
  try {
    // db.connect
    //get details of password such as iv from DB
    const { rows } = await db.pool.query(
      `SELECT * FROM passwords WHERE _id = $1`,
      [passwordId]
    );

    if (rows.length === 0) res.status(404).json("Not Found");
    else {
      const password = rows[0].password;
      const iv = rows[0].iv;
      const id = rows[0]._id;

      //decrypt the password
      const decryptedPassword = decrypt(password, iv);

      //return the password
      res.status(200).json({ decryptedPassword, id });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal Server Error" });
  }
};

const createPassword = async (req: Request, res: Response) => {
  //get data from client
  const { websiteName, password } = req.body;

  try {
    // db.connect;
    if (!websiteName || !password) {
      //Bad request (400)
      res.status(400).json("Enter Required Input Fields");
    } else {
      //get user Id from cookies
      const userId = req.cookies.auth_cookie._id;

      //encrypt the password before storing to db
      const data = encrypt(password);
      const encryptedPassword = data.encryptedData;
      const base64data = data.base64data;

      //store password in DB
      const newPassword = {
        websiteName: websiteName,
        password: encryptedPassword,
        iv: base64data,
      };

      await db.pool.query(
        `INSERT INTO passwords(websiteName, password, iv, createdBy) 
                    VALUES($1, $2, $3, $4)`,
        [websiteName, encryptedPassword, base64data, userId]
      );
      
      res.status(201).json(newPassword);
    }
  } catch (error) {
   
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatePassword = async (req: Request, res: Response) => {
  const passwordId = req.params.id;
  const { websiteName, password } = req.body;

  try {
    // db.connect;
    if (websiteName === "" || password === "") {
      //Bad request (400)
      res.status(400).json("Enter Required Input Fields");
    } else {
      const { rows } = await db.pool.query(
        `SELECT * FROM passwords WHERE _id = $1`,
        [passwordId]
      );

      if (rows.length === 0) {
        res.status(404).json("not found");
      } else {
        //get user Id from cookies
        const userId = req.cookies.auth_cookie._id;

        //encrypt the password before storing to db
        const data = encrypt(password);
        const encryptedPassword = data.encryptedData;
        const base64data = data.base64data;

        const newPassword = {
          websiteName: websiteName,
          password: encryptedPassword,
          iv: base64data,
          userId: userId,
        };

        //update password in DB
        await db.pool.query(
          `UPDATE passwords SET websitename = $1, password = $2, iv = $3 WHERE _id = $4`,
          [websiteName, encryptedPassword, base64data, passwordId]
        );

        res.status(200).json(newPassword);
      }
      
    }
  } catch (error) {
   
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }

};

const deletePassword = async (req: Request, res: Response) => {
  //get password Id
  const passwordId = req.params.id;
  //get user Id from cookies
  const userId = req.cookies.auth_cookie._id;

  try {
    // db.connect;
    const { rows } = await db.pool.query(
      `SELECT * FROM passwords WHERE _id = $1`,
      [passwordId]
    );

    if (rows.length === 0) {
      res.status(404).json("not found");
    } else {
      //delete password with id
      await db.pool.query(`DELETE FROM passwords WHERE _id = $1`, [
        passwordId,
      ]);
      
      res.status(200).json("Password Deleted With id: " + passwordId);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  getAllPasswords,
  decryptPassword,
  createPassword,
  updatePassword,
  deletePassword,
};
