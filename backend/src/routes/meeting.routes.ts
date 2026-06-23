import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middlewares/validate.js";
import {
  createMeeting,
  getMeetingById,
  listMeetings,
  updateMeetingStatus
} from "../controllers/meeting.controller.js";
import {
  createMeetingSchema,
  meetingIdParamSchema,
  updateMeetingStatusSchema
} from "../schemas/meeting.schema.js";

const meetingRouter = Router();

meetingRouter.use(authenticate);
meetingRouter.post("/", validate(createMeetingSchema), asyncHandler(createMeeting));
meetingRouter.get("/", asyncHandler(listMeetings));
meetingRouter.get("/:meetingId", validate(meetingIdParamSchema), asyncHandler(getMeetingById));
meetingRouter.patch("/:meetingId/status", validate(updateMeetingStatusSchema), asyncHandler(updateMeetingStatus));

export { meetingRouter };
