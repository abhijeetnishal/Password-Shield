"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const postgres_pool_1 = require("postgres-pool");
require("dotenv").config();
//Create a new PostgreSQL client instance:
const connectionString = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
const client = new pg_1.Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false },
});
const pool = new postgres_pool_1.Pool({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false },
});
//Connect to the PostgreSQL server
const connect = client.connect((err) => {
    if (err)
        console.log("Error connecting to PostgreSQL: ", err.stack);
    else
        console.log("Connected to PostgreSQL database");
});
exports.default = { client, connect, pool };
//# sourceMappingURL=dbConnect.js.map