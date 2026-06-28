import { Server } from "socket.io";
import { env } from "../config/env.js";
import { registerMeetingSocketHandlers } from "./meeting.socket.js";

export function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: env.CLIENT_ORIGIN,
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    registerMeetingSocketHandlers(io, socket);
  });

  return io;
}
