import { StatusCodes } from "http-status-codes";
import { Meeting } from "../models/Meeting.js";
import { ActionItem } from "../models/ActionItem.js";
import { User } from "../models/User.js";
import { generateMeetingInsights } from "../services/ai.service.js";
import { ApiError } from "../utils/ApiError.js";

async function resolveAssigneeId(assigneeName) {
  if (!assigneeName) {
    return null;
  }

  const user = await User.findOne({ name: new RegExp(`^${assigneeName}$`, "i") });
  return user?._id ?? null;
}

export async function generateInsights(req, res) {
  const { meetingId, transcript } = req.validated?.body;

  const meeting = await Meeting.findOne({ _id: meetingId, "participants.userId": req.user.id });
  if (!meeting) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Meeting not found");
  }

  const insights = await generateMeetingInsights(transcript);

  meeting.transcript = transcript;
  meeting.summary = insights.summary;
  await meeting.save();

  const createdActionItems = [];
  for (const item of insights.actionItems) {
    const assigneeUserId = await resolveAssigneeId(item.assigneeName);
    const created = await ActionItem.create({
      meetingId,
      title: item.title || "Untitled action item",
      description: item.description || "",
      assigneeUserId,
      dueDate: item.dueDate ? new Date(item.dueDate) : null,
      source: "ai"
    });
    createdActionItems.push(created);
  }

  return res.status(StatusCodes.OK).json({
    success: true,
    data: {
      meetingId,
      summary: insights.summary,
      actionItems: createdActionItems
    }
  });
}
