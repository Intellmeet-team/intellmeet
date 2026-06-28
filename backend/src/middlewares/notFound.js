import { StatusCodes } from "http-status-codes";

export function notFoundHandler(req, res) {
  return res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
}
