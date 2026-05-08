import { Router } from 'express';
import { GetAllCategoriesController, CreateCategoryController, UpdateCategoryController, DeleteCategoryController } from '../controllers/CategoryController.js';
import { authenticate } from '../middleware/AuthMiddleware.js';

const router = Router();

router.use(authenticate);

router.get('/', GetAllCategoriesController);
router.post('/', CreateCategoryController);
router.put('/:id', UpdateCategoryController);
router.delete('/:id', DeleteCategoryController);



export default router;