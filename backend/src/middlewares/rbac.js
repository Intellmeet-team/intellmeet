import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";

export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      next(new ApiError(StatusCodes.FORBIDDEN, "Insufficient permission"));
      return;
    }

    next();
  };
}
