import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middlewares/validate.js";
import { googleOAuthSchema, loginSchema, refreshTokenSchema, registerSchema } from "../schemas/auth.schema.js";
import { googleOAuth, login, refreshToken, register } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), asyncHandler(register));
authRouter.post("/login", validate(loginSchema), asyncHandler(login));
authRouter.post("/refresh-token", validate(refreshTokenSchema), asyncHandler(refreshToken));
authRouter.post("/oauth/google", validate(googleOAuthSchema), asyncHandler(googleOAuth));

export { authRouter };
