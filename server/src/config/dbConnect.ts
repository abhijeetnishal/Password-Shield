import { Client } from "pg";
import { Pool } from "postgres-pool";

require("dotenv").config();
//Create a new PostgreSQL client instance:
const connectionString = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
const client = new Client({
  connectionString: connectionString,
 // ssl: { rejectUnauthorized: false },
});

const pool = new Pool({
  connectionString: connectionString,
 // ssl: { rejectUnauthorized: false },
});

//Connect to the PostgreSQL server
const connect = client.connect((err) => {
  if (err) console.log("Error connecting to PostgreSQL: ", err.stack);
  else console.log("Connected to PostgreSQL database");
});

export { client, connect, pool };
