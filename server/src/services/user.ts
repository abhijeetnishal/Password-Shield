import { pool } from "../config/dbConnect";

const getDetails = async (queryKey: string, queryValue: string) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM users WHERE ${queryKey} = $1`,
      [queryValue]
    );

    const user = rows[0];
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { getDetails };
