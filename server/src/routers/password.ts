import express from "express";
import isAuthenticated from "../middlewares/auth";
import {
  createPassword,
  deletePassword,
  getAllPasswords,
  updatePassword,
} from "../controllers/password";

const passwordRouter = express.Router();

passwordRouter.get("/passwords/", isAuthenticated, getAllPasswords);

passwordRouter.post("/passwords/", isAuthenticated, createPassword);

passwordRouter.put("/passwords/:id", isAuthenticated, updatePassword);

passwordRouter.delete("/passwords/:id", isAuthenticated, deletePassword);

export default passwordRouter;
