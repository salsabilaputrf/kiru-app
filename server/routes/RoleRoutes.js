import { Router } from 'express';
import { GetAllRolesController } from '../controllers/RoleControllers.js';
import { authenticate } from '../middleware/AuthMiddleware.js';

const router = Router();

router.use(authenticate);

router.get('/', GetAllRolesController);


export default router;