import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";

type JwtPayload = {
  id: string;
  email: string;
  role?: "admin" | "member";
  name?: string;
};

export function signAccessToken(payload: JwtPayload): string {
  const expiresIn = env.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"];
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn
  });
}

export function signRefreshToken(payload: Pick<JwtPayload, "id" | "email">): string {
  const expiresIn = env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"];
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn
  });
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload;
}
