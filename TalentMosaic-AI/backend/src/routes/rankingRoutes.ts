import express from "express";
import { getRankedCandidates } from "../controllers/rankingController";

const router = express.Router();

router.post("/rank-candidates", getRankedCandidates);

export default router;
