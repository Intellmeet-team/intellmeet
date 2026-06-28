import { MeetingMessage } from "../models/MeetingMessage.js";

export function registerMeetingSocketHandlers(io, socket) {
  socket.on("meeting:join", async ({ meetingId, user }) => {
    socket.join(meetingId);
    io.to(meetingId).emit("meeting:user-joined", {
      userId: user?.id,
      name: user?.name,
      at: new Date().toISOString()
    });
  });

  socket.on("meeting:typing", ({ meetingId, userId, isTyping }) => {
    socket.to(meetingId).emit("meeting:typing", { userId, isTyping });
  });

  socket.on("meeting:chat", async ({ meetingId, senderId, body }) => {
    if (!meetingId || !senderId || !body) {
      return;
    }

    const message = await MeetingMessage.create({
      meetingId,
      senderId,
      body
    });

    io.to(meetingId).emit("meeting:chat", {
      _id: message._id,
      meetingId,
      senderId,
      body,
      createdAt: message.createdAt
    });
  });
}
