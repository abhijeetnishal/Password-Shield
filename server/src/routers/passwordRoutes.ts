import express from "express";
import isAuthenticated from "../middlewares/auth";
import {
  createPassword,
  decryptPassword,
  deletePassword,
  getAllPasswords,
  updatePassword,
} from "../controller/passwordControllers";

//create a router for password
const passwordRouter = express.Router();

//create an endpoint to get all website names with password for particular user
passwordRouter.get("/all/:id", isAuthenticated, getAllPasswords);

//create an endpoint to decrypt specific encrypted password
passwordRouter.get("/specific/:id", isAuthenticated, decryptPassword);

//create an endpoint to create an website name with password
passwordRouter.post("/", isAuthenticated, createPassword);

//create an endpoint to update website and password data
passwordRouter.put("/:id", isAuthenticated, updatePassword);

//create an endpoint to delete website and password data
passwordRouter.delete("/:id", isAuthenticated, deletePassword);

export default passwordRouter;
