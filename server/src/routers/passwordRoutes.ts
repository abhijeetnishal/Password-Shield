import express from "express";
import isAuthenticated from "../middlewares/auth";
import {
  createPassword,
  deletePassword,
  getAllPasswords,
  updatePassword,
} from "../controllers/passwordControllers";

const passwordRouter = express.Router();

// Endpoint to retrieve all passwords for the authenticated user
passwordRouter.get("/passwords/", isAuthenticated, getAllPasswords);

// Endpoint to create a new password entry
passwordRouter.post("/passwords/", isAuthenticated, createPassword);

// Endpoint to update password entry
passwordRouter.put("/passwords/:id", isAuthenticated, updatePassword);

// Endpoint to delete password entry
passwordRouter.delete("/passwords/:id", isAuthenticated, deletePassword);

export default passwordRouter;
