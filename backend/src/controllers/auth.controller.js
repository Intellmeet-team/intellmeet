import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { randomUUID } from "node:crypto";
import { env } from "../config/env.js";
import { User } from "../models/User.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../services/jwt.service.js";
import { ApiError } from "../utils/ApiError.js";

function toAuthPayload(user) {
  return {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
    name: user.name
  };
}

function createTokenResponse(user) {
  const payload = toAuthPayload(user);
  return {
    user: payload,
    tokens: {
      accessToken: signAccessToken(payload),
      refreshToken: signRefreshToken({ id: payload.id, email: payload.email })
    }
  };
}

async function verifyGoogleIdToken(idToken) {
  const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
  if (!response.ok) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid Google OAuth token");
  }

  const profile = await response.json();
  if (env.GOOGLE_CLIENT_ID && profile.aud !== env.GOOGLE_CLIENT_ID) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Google OAuth token audience mismatch");
  }

  if (profile.email_verified !== "true" || !profile.email || !profile.sub) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Google account email is not verified");
  }

  return {
    googleId: profile.sub,
    email: profile.email,
    name: profile.name || profile.email.split("@")[0],
    avatarUrl: profile.picture || null
  };
}

export async function register(req, res) {
  const { name, email, password, role } = req.validated?.body;

  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(StatusCodes.CONFLICT, "Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash, role: role || "member" });

  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Account created",
    data: createTokenResponse(user)
  });
}

export async function login(req, res) {
  const { email, password } = req.validated?.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
  }

  user.lastLoginAt = new Date();
  await user.save();

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Login successful",
    data: createTokenResponse(user)
  });
}

export async function refreshToken(req, res) {
  const { refreshToken: token } = req.validated?.body;

  let decoded;
  try {
    decoded = verifyRefreshToken(token);
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

export async function googleOAuth(req, res) {
  const { idToken } = req.validated?.body;
  const googleProfile = await verifyGoogleIdToken(idToken);

  let user = await User.findOne({
    $or: [{ googleId: googleProfile.googleId }, { email: googleProfile.email }]
  });

  if (!user) {
    const passwordHash = await bcrypt.hash(randomUUID(), 12);
    user = await User.create({
      name: googleProfile.name,
      email: googleProfile.email,
      passwordHash,
      authProvider: "google",
      googleId: googleProfile.googleId,
      avatarUrl: googleProfile.avatarUrl,
      lastLoginAt: new Date()
    });
  } else {
    user.googleId = user.googleId || googleProfile.googleId;
    user.authProvider = user.authProvider === "local" ? "local" : "google";
    user.avatarUrl = user.avatarUrl || googleProfile.avatarUrl;
    user.lastLoginAt = new Date();
    await user.save();
  }

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Google OAuth login successful",
    data: createTokenResponse(user)
  });
}
