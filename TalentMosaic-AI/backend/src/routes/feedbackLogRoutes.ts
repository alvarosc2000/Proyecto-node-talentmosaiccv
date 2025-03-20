import express from "express";
import { getFeedbackLogs, addFeedbackLog } from "../controllers/feedbackLogController";

const router = express.Router();

router.get("/", getFeedbackLogs);
router.post("/", addFeedbackLog);

export default router;
