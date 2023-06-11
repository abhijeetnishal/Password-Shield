import db from "./dbConnect";

const createUserSchema = async()=> {
    try {
        //Connect to the PostgreSQL server
        db.connect;

        // Create the user schema
        await db.client.query(
            `CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            );`
        );
        console.log('User schema created successfully!');
    } 
    catch (error) {
      console.error('Error creating user schema:', error);
    }
}

export default createUserSchema;