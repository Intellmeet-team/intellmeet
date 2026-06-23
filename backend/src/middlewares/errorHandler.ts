import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      details: error.details
    });
  }

  if (error.name === "ZodError") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Validation failed",
      details: error.flatten()
    });
  }

  if (error.name === "ValidationError") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Database validation failed",
      details: error.errors
    });
  }

  if (error.name === "JsonWebTokenError") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Invalid token"
    });
  }

  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  return res.status(statusCode).json({
    success: false,
    message: error.message || "Internal server error"
  });
}
