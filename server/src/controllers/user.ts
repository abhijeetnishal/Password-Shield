import { Request, Response } from "express";
import { getDetails } from "../services/user";

// Define a custom interface that extends the Request interface with the _id property
interface AuthenticatedRequest extends Request {
  _id?: string; // Make it optional or provide a default value if needed
}

const getUserVerifyDetails = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const data = await getDetails("_id", req._id);

  return res.status(200).json({ data: data, message: "User details" });
};

export { getUserVerifyDetails };
