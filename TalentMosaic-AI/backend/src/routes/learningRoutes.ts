import express from "express";
import { improveRanking } from "../controllers/learningController";

const router = express.Router();

router.post("/improve-ranking", improveRanking);

export default router;
