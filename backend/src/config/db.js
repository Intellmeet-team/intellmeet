import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase() {
  console.log("Connecting to MongoDB...");
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000,
      retryWrites: false
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
}
