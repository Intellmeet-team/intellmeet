import { createClient } from "redis";
import { env } from "./env.js";

let redisClient = null;

export async function connectRedis() {
  if (!env.REDIS_URL) {
    console.log("Redis URL not configured, skipping Redis connection");
    return null;
  }

  console.log("Connecting to Redis...");
  redisClient = createClient({ 
    url: env.REDIS_URL,
    socket: {
      reconnectStrategy: (retries) => {
        if (retries > 3) {
          console.error("Redis reconnection failed after 3 attempts");
          return new Error("Redis max retries exceeded");
        }
        return Math.min(retries * 50, 500);
      }
    }
  });
  
  redisClient.on("error", (error) => {
    console.error("Redis error:", error.message);
  });

  redisClient.on("connect", () => {
    console.log("Redis connected successfully");
  });

  try {
    await redisClient.connect();
    return redisClient;
  } catch (error) {
    console.error("Redis connection failed:", error.message);
    console.log("Continuing without Redis connection");
    redisClient = null;
    return null;
  }
}

export function getRedisClient() {
  return redisClient;
}

export async function disconnectRedis() {
  if (redisClient?.isOpen) {
    await redisClient.disconnect();
  }
}
