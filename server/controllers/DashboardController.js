import * as dashboardService from "../services/DashboardService.js";
import { CustomError } from "../middleware/ErrorHandler.js";

export async function GetMonthlyFinanceStatsController(req, res, next) {
    try {
        const { month } = req.query;
         console.log(month)
        const response = await dashboardService.GetMonthlyFinanceStatsService(month);

        return res.status(200).json(response);
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                errors: error.errors
            });
        }
        next(error);
    }
}

export async function GetLowStockController(req, res, next) {
    try {
        // jika bukan owner hanya dapat melihat sesuai branchnya
        const branchId = req.user?.role?.role_name === 'owner' ? null : req.user?.branch?.id;
        
        const response = await dashboardService.GetLowStockService(branchId);

        return res.status(200).json(response);
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                errors: error.errors
            });
        }
        next(error);
    }
}

export async function GetDashboardTransactionsController(req, res, next) {
    try {
        const params = {
            branchName: req.user?.role?.role_name === 'owner' ? null : req.user?.branch?.name,
            isToday: req.user?.role?.role_name === 'kasir'
        };

        const response = await dashboardService.GetDashboardTransactionsService(params);

        return res.status(200).json(response);
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                errors: error.errors
            });
        }
        next(error);
    }
}

export async function GetFinancialReportByBranchController(req, res, next) {
    try {
        console.log(req.user.role)
        if (req.user?.role?.role_name !== 'owner') {
            throw new CustomError("Akses ditolak. Hanya Owner yang dapat melihat laporan ini.", 403);
        }

        const { month } = req.query;
        const response = await dashboardService.GetFinancialReportByBranchService(month);

        return res.status(200).json(response);
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                errors: error.errors
            });
        }
        next(error);
    }
}

export async function GetStockMutationLogController(req, res, next) {
    try {
        const branchName = req.user?.role?.role_name === 'owner' ? null : req.user?.branch?.name;
        
        const response = await dashboardService.GetStockMutationLogService(branchName);

        return res.status(200).json(response);
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                errors: error.errors
            });
        }
        next(error);
    }
}