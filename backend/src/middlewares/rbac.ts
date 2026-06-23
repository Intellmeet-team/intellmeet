import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";

export function authorize(...roles: Array<"admin" | "member">) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      next(new ApiError(StatusCodes.FORBIDDEN, "Insufficient permission"));
      return;
    }

    next();
  };
}
