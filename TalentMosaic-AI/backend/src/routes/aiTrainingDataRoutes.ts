import express from "express";
import { getTrainingData, addTrainingData } from "../controllers/aiTrainingDataController";

const router = express.Router();

router.get("/", getTrainingData);
router.post("/", addTrainingData);

export default router;
