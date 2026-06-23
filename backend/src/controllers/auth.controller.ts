import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/User.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../services/jwt.service.js";
import { ApiError } from "../utils/ApiError.js";

type AuthPayload = {
  id: string;
  email: string;
  role: "admin" | "member";
  name: string;
};

function toAuthPayload(user: any): AuthPayload {
  return {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
    name: user.name
  };
}

export async function register(req: Request, res: Response) {
  const { name, email, password, role } = req.validated?.body as {
    name: string;
    email: string;
    password: string;
    role?: "admin" | "member";
  };

  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(StatusCodes.CONFLICT, "Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash, role: role || "member" });

  const payload = toAuthPayload(user);
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken({ id: payload.id, email: payload.email });

  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Account created",
    data: {
      user: payload,
      tokens: { accessToken, refreshToken }
    }
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.validated?.body as { email: string; password: string };
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
  }

  const payload = toAuthPayload(user);
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken({ id: payload.id, email: payload.email });

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Login successful",
    data: {
      user: payload,
      tokens: { accessToken, refreshToken }
    }
  });
}

export async function refreshToken(req: Request, res: Response) {
  const { refreshToken: token } = req.validated?.body as { refreshToken: string };

  let decoded: { id: string };
  try {
    decoded = verifyRefreshToken(token) as { id: string };
  } catch {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid refresh token");
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "User no longer exists");
  }

  const payload = toAuthPayload(user);

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Token refreshed",
    data: {
      accessToken: signAccessToken(payload),
      refreshToken: signRefreshToken({ id: payload.id, email: payload.email })
    }
  });
}
