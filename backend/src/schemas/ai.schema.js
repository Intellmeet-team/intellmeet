import { z } from "zod";

const objectIdRegex = /^[a-f\d]{24}$/i;

export const generateMeetingInsightsSchema = z.object({
  body: z.object({
    meetingId: z.string().regex(objectIdRegex),
    transcript: z.string().min(20)
  })
});
