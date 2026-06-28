import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getMe } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/me", authenticate, asyncHandler(getMe));

export { userRouter };
