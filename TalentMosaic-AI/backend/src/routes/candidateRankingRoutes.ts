import express from 'express';
import { candidateRankingController } from '../controllers/candidateRankingController';

const router = express.Router();

router.post('/rank-candidates', candidateRankingController.createRanking);

export default router;
