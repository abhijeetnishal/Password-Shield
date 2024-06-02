"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePassword = exports.updatePassword = exports.createPassword = exports.getAllPasswords = void 0;
const dbConnect_1 = require("../config/dbConnect");
const user_1 = require("../services/user");
const encryption_1 = require("../utils/encryption");
const passwords_1 = require("../services/passwords");
const getAllPasswords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, limit, offset } = req.query;
    const id = req._id;
    try {
        const user = yield (0, user_1.getDetails)("_id", id);
        if (user) {
            const queryParams = [id];
            let queryStr = "SELECT * FROM passwords WHERE user_id = $1";
            if (search) {
                queryParams.push(`%${search}%`);
                queryStr += " AND website_name ILIKE $" + queryParams.length;
            }
            queryStr += " ORDER BY created_at";
            if (limit) {
                queryParams.push(limit.toString());
                queryStr += " LIMIT $" + queryParams.length;
            }
            if (offset) {
                queryParams.push(offset.toString());
                queryStr += " OFFSET $" + queryParams.length;
            }
            queryStr += ";";
            const { rows } = yield dbConnect_1.pool.query(queryStr, queryParams);
            return res
                .status(200)
                .json({ data: rows, message: "All saved passwords details" });
        }
        else {
            return res.status(404).json({ message: "User doesn't exist" });
        }
    }
    catch (error) {
        //display error
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllPasswords = getAllPasswords;
const createPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req._id;
        const user = yield (0, user_1.getDetails)("_id", id);
        if (user) {
            const { title, description, websiteName, password } = req.body;
            if (!websiteName || !password) {
                return res.status(400).json({ message: "Required fields missing" });
            }
            else {
                //encrypt the password before storing to db
                const data = (0, encryption_1.encrypt)(password);
                const encryptedPassword = data.encryptedData;
                const base64data = data.base64data;
                const { rows } = yield dbConnect_1.pool.query(`INSERT INTO passwords(title, description, website_name, password, iv, user_id)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *`, [title, description, websiteName, encryptedPassword, base64data, id]);
                return res
                    .status(201)
                    .json({ data: rows[0], message: "Password data saved" });
            }
        }
        else {
            return res.status(404).json({ message: "User doesn't exist" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createPassword = createPassword;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req._id;
        const user = yield (0, user_1.getDetails)("_id", id);
        if (user) {
            const { id } = req.params;
            const passwordExists = yield (0, passwords_1.getPasswordDetails)("_id", id);
            if (passwordExists) {
                const { title, description, websiteName, password } = req.body;
                // Build the update query dynamically
                const updateFields = [];
                const updateValues = [];
                if (title && title !== "") {
                    updateFields.push(`title = $${updateValues.length + 1}`);
                    updateValues.push(title);
                }
                if (description && description !== "") {
                    updateFields.push(`description = $${updateValues.length + 1}`);
                    updateValues.push(description);
                }
                if (websiteName && websiteName !== "") {
                    updateFields.push(`website_name = $${updateValues.length + 1}`);
                    updateValues.push(websiteName);
                }
                if (password) {
                    //encrypt the password before storing to db
                    const data = (0, encryption_1.encrypt)(password);
                    const encryptedPassword = data.encryptedData;
                    const base64data = data.base64data;
                    updateFields.push(`password = $${updateValues.length + 1}`);
                    updateValues.push(encryptedPassword);
                    updateFields.push(`iv = $${updateValues.length + 1}`);
                    updateValues.push(base64data);
                }
                if (updateFields.length > 0) {
                    updateFields.push(`updated_at = $${updateValues.length + 1}`);
                    updateValues.push(new Date().toISOString());
                    const updateQuery = `UPDATE passwords SET ${updateFields.join(", ")} WHERE _id = $${updateValues.length + 1} RETURNING *`;
                    updateValues.push(id);
                    const { rows } = yield dbConnect_1.pool.query(updateQuery, updateValues);
                    return res
                        .status(200)
                        .json({ data: rows[0], message: "Data updated successfully" });
                }
                else {
                    return res.status(200).json({ message: "No fields to update" });
                }
            }
            else {
                return res.status(404).json({ message: "No such password data found" });
            }
        }
        else {
            return res.status(404).json({ message: "User doesn't exist" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.updatePassword = updatePassword;
const deletePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req._id;
        const user = yield (0, user_1.getDetails)("_id", id);
        if (user) {
            const { id } = req.params;
            const passwordExists = yield (0, passwords_1.getPasswordDetails)("_id", id);
            if (passwordExists) {
                yield dbConnect_1.pool.query(`DELETE FROM passwords WHERE _id = $1`, [id]);
                return res
                    .status(200)
                    .json({ message: "Password deleted successfully" });
            }
            else {
                return res.status(404).json({ message: "No such password data found" });
            }
        }
        else {
            return res.status(404).json({ message: "User doesn't exist" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.deletePassword = deletePassword;
//# sourceMappingURL=password.js.map