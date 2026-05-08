import { Router } from 'express';
import { AddStockController } from '../controllers/StockController.js';
import { authenticate } from '../middleware/AuthMiddleware.js';

const router = Router();

router.use(authenticate);

router.post('/', AddStockController);


export default router;