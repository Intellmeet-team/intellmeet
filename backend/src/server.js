import http from "http";
import { app } from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase, disconnectDatabase } from "./config/db.js";
import { connectRedis, disconnectRedis } from "./config/redis.js";
import { setupSocket } from "./socket/index.js";

const server = http.createServer(app);
setupSocket(server);

async function startServer() {
  await connectDatabase();
  await connectRedis();

  server.listen(env.PORT, () => {
    console.log(`IntellMeet backend running on port ${env.PORT}`);
  });
}

async function shutdown(signal) {
  console.log(`${signal} received. Starting graceful shutdown...`);
  server.close(async () => {
    await disconnectRedis();
    await disconnectDatabase();
    process.exit(0);
  });
}

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});
process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});

startServer().catch(async (error) => {
  console.error("Failed to start server", error);
  await disconnectRedis();
  await disconnectDatabase();
  process.exit(1);
});
