import express from 'express';
import { userController } from '../controllers/userController';

const router = express.Router();

// Correctly bind the `login` method to the controller instance
router.post('/login', userController.login.bind);

export default router;
