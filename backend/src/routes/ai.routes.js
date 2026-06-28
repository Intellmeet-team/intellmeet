import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateMeetingInsightsSchema } from "../schemas/ai.schema.js";
import { generateInsights } from "../controllers/ai.controller.js";

const aiRouter = Router();

aiRouter.post("/meeting-insights", authenticate, validate(generateMeetingInsightsSchema), asyncHandler(generateInsights));

export { aiRouter };
