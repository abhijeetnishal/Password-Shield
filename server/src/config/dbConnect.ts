import { Client } from "pg";
import { Pool } from "postgres-pool";

require("dotenv").config();
//Create a new PostgreSQL client instance:
const connectionString = `postgres://password_shield_user:HDK3lsHW2ltLyeoQ48eoZRjbAmBqdsKK@dpg-cpe5155ds78s73eqfkj0-a.singapore-postgres.render.com/password_shield?ssl=true`;
const client = new Client({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false },
});

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false },
});

//Connect to the PostgreSQL server
const connect = client.connect((err) => {
  if (err) console.log("Error connecting to PostgreSQL: ", err.stack);
  else console.log("Connected to PostgreSQL database");
});

export { client, connect, pool };
