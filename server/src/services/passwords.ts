import { pool } from "../config/dbConnect";

const getPasswordDetails = async (queryKey: string, queryValue: string) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM passwords WHERE ${queryKey} = $1`,
      [queryValue]
    );

    const password = rows[0];
    return password;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { getPasswordDetails };
