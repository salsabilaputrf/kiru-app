import { Router } from 'express';
import * as dashboardController from '../controllers/DashboardController.js';
import { authenticate, authorize } from '../middleware/AuthMiddleware.js';

const router = Router();

router.use(authenticate);

router.get('/stats', dashboardController.GetMonthlyFinanceStatsController);

router.get('/low-stock', 
    authorize('owner', 'admin'), 
    dashboardController.GetLowStockController
);

router.get('/transactions', dashboardController.GetDashboardTransactionsController);

router.get('/branch-reports', 
    authorize('owner'), 
    dashboardController.GetFinancialReportByBranchController
);

router.get('/stock-logs', 
    authorize('owner', 'admin'), 
    dashboardController.GetStockMutationLogController
);

export default router;