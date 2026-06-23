import { createClient, type RedisClientType } from "redis";
import { env } from "./env.js";

let redisClient: RedisClientType | null = null;

export async function connectRedis(): Promise<RedisClientType | null> {
  if (!env.REDIS_URL) {
    return null;
  }

  redisClient = createClient({ url: env.REDIS_URL });
  redisClient.on("error", (error: unknown) => {
    console.error("Redis error", error);
  });

  await redisClient.connect();
  return redisClient;
}

export function getRedisClient(): RedisClientType | null {
  return redisClient;
}

export async function disconnectRedis(): Promise<void> {
  if (redisClient?.isOpen) {
    await redisClient.disconnect();
  }
}
