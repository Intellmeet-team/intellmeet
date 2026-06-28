import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import { apiRouter } from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFound.js";

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many auth attempts. Please try again later."
  }
});

app.use(`${env.API_PREFIX}/auth`, authLimiter);
app.use(env.API_PREFIX, apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
