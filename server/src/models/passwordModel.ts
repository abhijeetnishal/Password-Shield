import db from "./dbConnect";

const createPasswordSchema = async()=> {
    try {
        //Connect to the PostgreSQL server
        db.connect;

        // Create the user schema
        await db.client.query(
            `CREATE TABLE IF NOT EXISTS passwords (
                id SERIAL PRIMARY KEY,
                websiteName VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            );`
        );
        console.log('Password schema created successfully!');
    } 
    catch (error) {
      console.error('Error creating password schema:', error);
    } 
}

export default createPasswordSchema;