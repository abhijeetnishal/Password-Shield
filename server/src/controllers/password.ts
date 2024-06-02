import { Request, Response } from "express";
import { pool } from "../config/dbConnect";
import { getDetails } from "../services/user";
import { encrypt } from "../utils/encryption";
import { getPasswordDetails } from "../services/passwords";

// Define a custom interface that extends the Request interface with the _id property
interface AuthenticatedRequest extends Request {
  _id?: string; // Make it optional or provide a default value if needed
}

const getAllPasswords = async (req: AuthenticatedRequest, res: Response) => {
  const { search, limit, offset } = req.query;
  const id = req._id;

  try {
    const user = await getDetails("_id", id);

    if (user) {
      // Get data from DB
      const { rows } = await pool.query(
        `select * from passwords where 
        user_id=$1 and
        website_name ilike '%' || $2 || '%' ORDER BY
        $3 offset $4 limit $5;`,
        [id,search || "","created_at",offset || 10,limit || 10]);

      return res
        .status(200)
        .json({ data: rows, message: "All saved passwords details" });
    } else {
      return res.status(404).json({ message: "User doesn't exist" });
    }
  } catch (error) {
    //display error
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createPassword = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req._id;
    const user = await getDetails("_id", id);

    if (user) {
      const { title, description, websiteName, password } = req.body;

      if (!websiteName || !password) {
        return res.status(400).json({ message: "Required fields missing" });
      } else {
        //encrypt the password before storing to db
        const data = encrypt(password);
        const encryptedPassword = data.encryptedData;
        const base64data = data.base64data;

        const { rows } = await pool.query(
          `INSERT INTO passwords(title, description, website_name, password, iv, user_id)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *`,
          [title, description, websiteName, encryptedPassword, base64data, id]
        );

        return res
          .status(201)
          .json({ data: rows[0], message: "Password data saved" });
      }
    } else {
      return res.status(404).json({ message: "User doesn't exist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatePassword = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req._id;
    const user = await getDetails("_id", id);

    if (user) {
      const { id } = req.params;
      const passwordExists = await getPasswordDetails("_id", id);

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
          const data = encrypt(password);
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

          const updateQuery = `UPDATE passwords SET ${updateFields.join(
            ", "
          )} WHERE _id = $${updateValues.length + 1} RETURNING *`;
          updateValues.push(id);

          const { rows } = await pool.query(updateQuery, updateValues);
          return res
            .status(200)
            .json({ data: rows[0], message: "Data updated successfully" });
        } else {
          return res.status(200).json({ message: "No fields to update" });
        }
      } else {
        return res.status(404).json({ message: "No such password data found" });
      }
    } else {
      return res.status(404).json({ message: "User doesn't exist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deletePassword = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req._id;
    const user = await getDetails("_id", id);

    if (user) {
      const { id } = req.params;
      const passwordExists = await getPasswordDetails("_id", id);

      if (passwordExists) {
        await pool.query(`DELETE FROM passwords WHERE _id = $1`, [id]);

        return res
          .status(200)
          .json({ message: "Password deleted successfully" });
      } else {
        return res.status(404).json({ message: "No such password data found" });
      }
    } else {
      return res.status(404).json({ message: "User doesn't exist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllPasswords, createPassword, updatePassword, deletePassword };
