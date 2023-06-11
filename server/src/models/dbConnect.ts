import { Client } from "pg";

//Create a new PostgreSQL client instance using the connection configuration:
const client = new Client(`postgres://${process.env.user}:${process.env.password}@${process.env.host}/${process.env.database}`);

//Connect to the PostgreSQL server
client.connect((err) => {
    if(err)
      console.error('Error connecting to PostgreSQL: ', err.stack);
    else 
      console.log('Connected to PostgreSQL database');
});

export default client;