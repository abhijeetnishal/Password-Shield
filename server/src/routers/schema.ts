import express from "express";
import createSchemas from "../models/schemas";

const schemaRouter = express.Router();

// Endpoint for creating schemas.
schemaRouter.post("/schema", createSchemas);

export default schemaRouter;
