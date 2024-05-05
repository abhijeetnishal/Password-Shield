import { Client } from "pg";

require("dotenv").config();
//Create a new PostgreSQL client instance:
const connectionString = `postgres://${process.env.user}:${process.env.password}@${process.env.host}:${process.env.port}/${process.env.database}?sslmode=require`;
const client = new Client(connectionString);

//Connect to the PostgreSQL server
const connect = client.connect((err) => {
  if (err) console.log("Error connecting to PostgreSQL: ", err.stack);
  else console.log("Connected to PostgreSQL database");
});

export default { client, connect };
