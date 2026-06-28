import { StatusCodes } from "http-status-codes";
import { User } from "../models/User.js";

export async function getMe(req, res) {
  const user = await User.findById(req.user?.id).select("-passwordHash").lean();

  return res.status(StatusCodes.OK).json({
    success: true,
    data: user
  });
}
