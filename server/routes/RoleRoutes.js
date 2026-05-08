import { Router } from 'express';
import { GetAllRolesController } from '../controllers/RoleController.js';
import { authenticate } from '../middleware/AuthMiddleware.js';

const router = Router();

router.use(authenticate);

router.get('/', GetAllRolesController);


export default router;