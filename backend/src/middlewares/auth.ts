import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { verifyAccessToken } from "../services/jwt.service.js";
import { ApiError } from "../utils/ApiError.js";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, "Missing bearer token"));
    return;
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const decoded = verifyAccessToken(token);
    if (!decoded.id || !decoded.email || !decoded.role || !decoded.name) {
      next(new ApiError(StatusCodes.UNAUTHORIZED, "Malformed auth token"));
      return;
    }

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      name: decoded.name
    };

    next();
  } catch {
    next(new ApiError(StatusCodes.UNAUTHORIZED, "Session expired or invalid token"));
  }
}
