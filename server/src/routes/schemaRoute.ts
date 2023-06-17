//import express to use router method
import express from 'express'

//express.Router() is a method in the Express.js that creates a new router object.
//It is used to define routes for a specific endpoint.
const schemaRouter = express.Router();

import createSchemas from '../models/schemas';

//create endpoint for creating schemas.
schemaRouter.post('/schema', createSchemas);

export default schemaRouter;