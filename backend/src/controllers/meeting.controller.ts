import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { Meeting } from "../models/Meeting.js";
import { MeetingMessage } from "../models/MeetingMessage.js";
import { ActionItem } from "../models/ActionItem.js";
import { ApiError } from "../utils/ApiError.js";

export async function createMeeting(req: Request, res: Response) {
  const { title, description = "", startTime, participantUserIds } = req.validated?.body as {
    title: string;
    description?: string;
    startTime: string;
    participantUserIds: string[];
  };

  const participantIds = [...new Set(participantUserIds)];
  const participants = participantIds.map((userId) => ({ userId, joinedAt: null, leftAt: null }));

  const hostId = req.user!.id;
  const hostExists = participants.some((p) => p.userId === hostId);
  if (!hostExists) {
    participants.unshift({ userId: hostId, joinedAt: null, leftAt: null });
  }

  const meeting = await Meeting.create({
    title,
    description,
    startTime: new Date(startTime),
    hostUserId: hostId,
    participants
  });

  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Meeting created",
    data: meeting
  });
}

export async function listMeetings(req: Request, res: Response) {
  const meetings = await Meeting.find({ "participants.userId": req.user!.id })
    .sort({ startTime: -1 })
    .limit(100)
    .lean();

  return res.status(StatusCodes.OK).json({ success: true, data: meetings });
}

export async function getMeetingById(req: Request, res: Response) {
  const { meetingId } = req.validated?.params as { meetingId: string };

  const meeting = await Meeting.findOne({ _id: meetingId, "participants.userId": req.user!.id }).lean();
  if (!meeting) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Meeting not found");
  }

  const [messages, actionItems] = await Promise.all([
    MeetingMessage.find({ meetingId }).sort({ createdAt: 1 }).lean(),
    ActionItem.find({ meetingId }).sort({ createdAt: -1 }).lean()
  ]);

  return res.status(StatusCodes.OK).json({
    success: true,
    data: {
      ...meeting,
      messages,
      actionItems
    }
  });
}

export async function updateMeetingStatus(req: Request, res: Response) {
  const { meetingId } = req.validated?.params as { meetingId: string };
  const { status, endTime } = req.validated?.body as {
    status: "scheduled" | "live" | "completed" | "cancelled";
    endTime?: string;
  };

  const filter = {
    _id: new mongoose.Types.ObjectId(meetingId),
    hostUserId: new mongoose.Types.ObjectId(req.user!.id)
  };

  const update: { status: string; endTime?: Date } = { status };
  if (endTime) {
    update.endTime = new Date(endTime);
  }

  const meeting = await Meeting.findOneAndUpdate(filter, update, { new: true });
  if (!meeting) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Meeting not found or not owned by user");
  }

  return res.status(StatusCodes.OK).json({ success: true, data: meeting });
}
