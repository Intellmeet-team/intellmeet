import { Router } from "express";
import { healthRouter } from "./health.routes.js";
import { authRouter } from "./auth.routes.js";
import { userRouter } from "./user.routes.js";
import { meetingRouter } from "./meeting.routes.js";
import { aiRouter } from "./ai.routes.js";

const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/meetings", meetingRouter);
apiRouter.use("/ai", aiRouter);

export { apiRouter };
