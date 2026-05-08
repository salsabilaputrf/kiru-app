import express from 'express';
import { LoginController } from '../controllers/AuthController.js';
import { authLimiter } from '../middleware/RateLimiter.js';

const router = express.Router();

// router.post('/login', authLimiter, LoginController);
// Tidak menggunakan authLimiter karena masih tahap percobaan, dimana coba beberapa role agar tidak terkena error 429 
router.post('/login', LoginController);

export default router;