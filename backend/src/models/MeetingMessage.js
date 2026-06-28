import mongoose from "mongoose";

const meetingMessageSchema = new mongoose.Schema(
  {
    meetingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting",
      required: true,
      index: true
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    body: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000
    }
  },
  { timestamps: true }
);

export const MeetingMessage = mongoose.model("MeetingMessage", meetingMessageSchema);
