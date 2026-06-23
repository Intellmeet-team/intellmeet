import { z } from "zod";

const objectIdRegex = /^[a-f\d]{24}$/i;

export const createMeetingSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(180),
    description: z.string().max(3000).optional(),
    startTime: z.string().datetime({ offset: true }),
    participantUserIds: z.array(z.string().regex(objectIdRegex)).default([])
  })
});

export const meetingIdParamSchema = z.object({
  params: z.object({
    meetingId: z.string().regex(objectIdRegex)
  })
});

export const updateMeetingStatusSchema = z.object({
  params: z.object({
    meetingId: z.string().regex(objectIdRegex)
  }),
  body: z.object({
    status: z.enum(["scheduled", "live", "completed", "cancelled"]),
    endTime: z.string().datetime({ offset: true }).optional()
  })
});
