import { Router } from 'express';
import { GetAllBranchesController } from '../controllers/BranchController.js';
import { authenticate } from '../middleware/AuthMiddleware.js';

const router = Router();

router.use(authenticate);

router.get('/', GetAllBranchesController);


export default router;