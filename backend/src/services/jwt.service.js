import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function signAccessToken(payload) {
  const expiresIn = env.JWT_ACCESS_EXPIRES_IN;
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn
  });
}

export function signRefreshToken(payload) {
  const expiresIn = env.JWT_REFRESH_EXPIRES_IN;
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn
  });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET);
}
