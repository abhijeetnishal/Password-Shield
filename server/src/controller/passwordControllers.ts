import { Request, Response, response } from "express";
import encryptDecrypt from "../middlewares/encryptDecrypt";
import isAuthenticated from "../middlewares/auth";
import db from "../config/dbConnect";
import redisConnect from "../config/redisConnect";

const getAllPasswords = async (req: Request, res: Response) => {
    //get user Id whose data need to get
    const userId = req.params.id;

    try {
        if(isAuthenticated) {
            //get client from redisConnect.ts file
            const client = await redisConnect();

            //check if value is present in Redis or not get(key)
            const dataCached = await client.get(`cached_data_${userId}`);

            //if value is present(cache hit)
            if (dataCached) {
                //parse the value from string to (arr of obj)
                const cachedData = JSON.parse(dataCached);

                //return the cached data instead from DB
                return res.status(200).json(cachedData);
            }
            //if value is not present(cache miss)
            else {
                //get data from DB
                const { rows } = await db.client.query(
                    `SELECT * FROM passwords WHERE createdBy = $1`, [userId]
                );
                //check if data contains any value or not 
                if (rows.length === 0)
                    return res.status(200).json({});
                else {
                    //store the data in Redis(key, value) with options
                    await client.set(`cached_data_${userId}`, JSON.stringify(rows), {
                        //set expiration time: meaning that the key will automatically expire and be deleted from the database after 7200 seconds.
                        EX: 300,
                        //not exist: ensures that the key is only set if it does not already exist in the database. 
                        NX: true
                    });

                    //return the data
                    return res.status(200).json(rows);
                }
            }
        }
        else {
            response.status(403).json('user not authenticated');
        }
    }
    catch (error) {
        //display error
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const decryptPassword = async (req: Request, res: Response) => {
    //get the password Id from req to decrypt
    const passwordId = req.params.id;
    try {
        if (isAuthenticated) {
            //get details of password such as iv from DB
            const { rows } = await db.client.query(
                `SELECT * FROM passwords WHERE _id = $1`, [passwordId]
            );

            if (rows.length === 0)
                res.status(404).json('Not Found');

            else {
                const password = rows[0].password;
                const iv = rows[0].iv;
                const id = rows[0]._id;

                //decrypt the password
                const decryptedPassword = encryptDecrypt.decrypt(password, iv);

                //return the password
                res.status(200).json({decryptedPassword, id});
            }
        }
        else {
            response.status(403).json('user not authenticated');
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal Server Error" });
    }
}

const createPassword = async (req: Request, res: Response) => {
    //get data from client
    const { websiteName, password } = req.body;

    try {
        if (!websiteName || !password) {
            //Bad request (400)
            res.status(400).json('Enter Required Input Fields');
        }
        else {
            if (isAuthenticated) {
                //get user Id from cookies
                const userId = req.cookies.auth_cookie._id;

                //get client from redisConnect.ts file
                const client = await redisConnect();

                //invalidate cache
                client.del(`cached_data_${userId}`);

                //encrypt the password before storing to db
                const data = encryptDecrypt.encrypt(password);
                const encryptedPassword = data.encryptedData;
                const base64data = data.base64data;

                //store password in DB
                const newPassword = {
                    websiteName: websiteName,
                    password: encryptedPassword,
                    iv: base64data,
                };

                await db.client.query(
                    `INSERT INTO passwords(websiteName, password, iv, createdBy) 
                    VALUES($1, $2, $3, $4)`, [websiteName, encryptedPassword, base64data, userId]
                );

                res.status(201).json(newPassword);
            }
            else {
                res.status(403).json('user not authenticated');
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const updatePassword = async (req: Request, res: Response) => {
    const passwordId = req.params.id;
    const { websiteName, password } = req.body;

    try {
        if (isAuthenticated) {
            if (websiteName === '' || password === '') {
                //Bad request (400)
                res.status(400).json('Enter Required Input Fields');
            }
            else {
                const { rows } = await db.client.query(
                    `SELECT * FROM passwords WHERE _id = $1`, [passwordId]
                )

                if (rows.length === 0) {
                    res.status(404).json('not found');
                }
                else {
                    //get user Id from cookies
                    const userId = req.cookies.auth_cookie._id;

                    //get client from redisConnect.ts file
                    const client = await redisConnect();

                    //invalidate cache
                    client.del(`cached_data_${userId}`);

                    //encrypt the password before storing to db
                    const data = encryptDecrypt.encrypt(password);
                    const encryptedPassword = data.encryptedData;
                    const base64data = data.base64data;

                    const newPassword = {
                        websiteName: websiteName,
                        password: encryptedPassword,
                        iv: base64data,
                        userId: userId
                    }

                    //update password in DB
                    await db.client.query(
                        `UPDATE passwords SET websitename = $1, password = $2, iv = $3 WHERE _id = $4`,
                        [websiteName, encryptedPassword, base64data, passwordId]
                    )

                    res.status(200).json(newPassword);
                }
            }
        }
        else {
            res.status(403).json('user not authenticated');
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const deletePassword = async (req: Request, res: Response) => {
    //get password Id
    const passwordId = req.params.id;
    //get user Id from cookies
    const userId = req.cookies.auth_cookie._id;

    try {
        if (isAuthenticated) {
            const { rows } = await db.client.query(
                `SELECT * FROM passwords WHERE _id = $1`, [passwordId]
            )

            if (rows.length === 0) {
                res.status(404).json('not found');
            }
            else {
                //get client from redisConnect.ts file
                const client = await redisConnect();

                //invalidate cache
                client.del(`cached_data_${userId}`);

                //delete password with id
                await db.client.query(
                    `DELETE FROM passwords WHERE _id = $1`, [passwordId]
                );

                res.status(200).json('Password Deleted With id: ' + passwordId);
            }
        }
        else {
            res.status(403).json('user not authenticated');
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export default {
    getAllPasswords,
    decryptPassword,
    createPassword,
    updatePassword,
    deletePassword
}