import mongoose from "mongoose";

const actionItemSchema = new mongoose.Schema(
  {
    meetingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting",
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 220
    },
    description: {
      type: String,
      default: ""
    },
    assigneeUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    dueDate: {
      type: Date,
      default: null
    },
    status: {
      type: String,
      enum: ["todo", "in_progress", "done"],
      default: "todo"
    },
    source: {
      type: String,
      enum: ["manual", "ai"],
      default: "manual"
    }
  },
  { timestamps: true }
);

export const ActionItem = mongoose.model("ActionItem", actionItemSchema);
