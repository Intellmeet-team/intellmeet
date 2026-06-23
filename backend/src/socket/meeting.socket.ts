import { MeetingMessage } from "../models/MeetingMessage.js";

type JoinPayload = {
  meetingId: string;
  user?: { id?: string; name?: string };
};

type TypingPayload = {
  meetingId: string;
  userId: string;
  isTyping: boolean;
};

type ChatPayload = {
  meetingId: string;
  senderId: string;
  body: string;
};

export function registerMeetingSocketHandlers(io: any, socket: any) {
  socket.on("meeting:join", async ({ meetingId, user }: JoinPayload) => {
    socket.join(meetingId);
    io.to(meetingId).emit("meeting:user-joined", {
      userId: user?.id,
      name: user?.name,
      at: new Date().toISOString()
    });
  });

  socket.on("meeting:typing", ({ meetingId, userId, isTyping }: TypingPayload) => {
    socket.to(meetingId).emit("meeting:typing", { userId, isTyping });
  });

  socket.on("meeting:chat", async ({ meetingId, senderId, body }: ChatPayload) => {
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
