//import express to use router method
import express from 'express'

//express.Router() is a method in the Express.js that creates a new router object.
//It is used to define routes for a specific endpoint.
const schemaRouter = express.Router();

//import schemas
import createSchemas from '../models/schemas';

//create an endpoint for creating schemas.
schemaRouter.post('/schema', createSchemas);

export default schemaRouter;