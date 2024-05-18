import { Request, Response } from "express";
import { pool } from "../config/dbConnect";

const createSchemas = async (req: Request, res: Response) => {
  try {
    // Create the schemas
    await pool.query(
      `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

        CREATE TABLE IF NOT EXISTS users (
            _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        );
        
        CREATE TABLE IF NOT EXISTS passwords (
            _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            title VARCHAR(255) NULL,
            description VARCHAR(255) NULL,
            website_name VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            iv VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            user_id UUID REFERENCES users(_id)
        );
      `
    );

    res.status(200).json("Schemas created successfully!");
  } catch (error) {
    console.error("Error creating schemas:", error);
    res.status(500).json("internal server error");
  }
};

export default createSchemas;
