"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
//Create a new PostgreSQL client instance:
//const connectionString = `postgres://${process.env.user}:${process.env.password}@${process.env.host}/${process.env.database}`;
const prodConnection = { connectionString: process.env.DB_URL_PROD, ssl: true };
const client = new pg_1.Client(prodConnection);
//Connect to the PostgreSQL server
const connect = client.connect((err) => {
    if (err)
        console.error('Error connecting to PostgreSQL: ', err.stack);
    else
        console.log('Connected to PostgreSQL database');
});
exports.default = { client, connect };
//# sourceMappingURL=dbConnect.js.map