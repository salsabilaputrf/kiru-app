import { Router } from 'express';
import * as productController from '../controllers/ProductController.js';
import { authenticate, authorize } from '../middleware/AuthMiddleware.js';

const router = Router();

router.use(authenticate);

router.get('/', productController.GetAllProductsController);
router.delete('/:id', authorize('owner'), productController.DeleteProductController);
router.post('/', authorize('owner', 'admin'), productController.CreateProductController);
router.put('/:id', authorize('owner', 'admin'), productController.UpdateProductController);

export default router;