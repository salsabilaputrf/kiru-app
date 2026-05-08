import { Router } from 'express';
import {
    GetAllTransactionsController,
    GetTransactionByIdController,
    CreateTransactionController,
    DeleteTransactionController,
} from '../controllers/TransactionController.js';
import { authenticate } from '../middleware/AuthMiddleware.js';

const router = Router();

router.use(authenticate);

router.get('/',    GetAllTransactionsController);
router.get('/:id', GetTransactionByIdController);
router.post('/',   CreateTransactionController);
router.delete('/:id', DeleteTransactionController);

export default router;