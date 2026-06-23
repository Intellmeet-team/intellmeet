import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "intellmeet-backend",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

export { healthRouter };
