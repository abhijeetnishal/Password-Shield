import express from "express";

import isAuthenticated from "../utils/auth";
import passwordControllers from "../controller/passwordControllers";


const passwordRouter = express.Router();

passwordRouter.get('/all/:id', isAuthenticated, passwordControllers.getAllPasswords);

passwordRouter.get('/specific/:id', isAuthenticated, passwordControllers.decryptPassword);

passwordRouter.post('/', isAuthenticated, passwordControllers.createPassword);

passwordRouter.put('/:id', isAuthenticated, passwordControllers.updatePassword);

passwordRouter.delete('/:id', isAuthenticated, passwordControllers.deletePassword);

export default passwordRouter;