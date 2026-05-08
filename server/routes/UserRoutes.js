import { Router } from 'express';
import * as userController from '../controllers/UserController.js';
import { authenticate, authorize } from '../middleware/AuthMiddleware.js';

const router = Router();

router.use(authenticate);

router.post('/', authorize('owner'), userController.CreateUserController);
router.get('/', authorize('owner'), userController.GetAllUsersController);
router.put('/:id', authorize('owner'), userController.UpdateUserController);
router.put('/change-password', userController.ChangePasswordController);

export default router;