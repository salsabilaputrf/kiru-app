import express from 'express';
import authRoutes from './AuthRoutes.js';
import userRoutes from './UserRoutes.js';
import roleRoutes from './RoleRoutes.js';
import branchRoutes from './BranchRoutes.js';
import productRoutes from './ProductRoutes.js';
import categoryRoutes from './CategoryRoutes.js';
import stockRoutes from './StockRoutes.js';
import transactionRoutes from './TransactionRoutes.js';
import dashboardRoutes from './DashboardRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/branches', branchRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/stocks', stockRoutes);
router.use('/transactions', transactionRoutes);
router.use('/reports', dashboardRoutes);


router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: "Hello Tesla, Selamat anda sudah dapat endpoint",
        timestamp: new Date().toISOString()
    });
});

export default router;

