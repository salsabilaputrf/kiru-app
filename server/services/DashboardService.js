import * as dashboardDomain from "../domains/DashboardDomain.js";
import { CustomError } from "../middleware/ErrorHandler.js";

export async function GetMonthlyFinanceStatsService(month) {
    try {
        const targetMonth = month || new Date().toISOString().slice(0, 7);
       
        const stats = await dashboardDomain.GetMonthlyFinanceStatsDomain(targetMonth);

        return {
            success: true,
            message: 'Berhasil mengambil statistik finansial',
            data: {
                stats: stats
            },
        };
    } catch (error) {
        throw new CustomError("Gagal mengambil statistik finansial: " + error.message, error.statusCode || 500);
    }
}

export async function GetLowStockService(branchId = null) {
    try {
        const lowStock = await dashboardDomain.GetLowStockDomain(branchId);

        return {
            success: true,
            message: 'Berhasil mengambil data stok menipis',
            data: {
                lowStock: lowStock
            },
        };
    } catch (error) {
        throw new CustomError("Gagal mengambil data stok menipis: " + error.message, error.statusCode || 500);
    }
}

export async function GetDashboardTransactionsService(params) {
    try {
       
        const transactions = await dashboardDomain.GetDashboardTransactionsDomain(params);

        return {
            success: true,
            message: 'Berhasil mengambil riwayat transaksi',
            data: {
                transactions: transactions ? transactions : []
            },
        };
    } catch (error) {
        throw new CustomError("Gagal mengambil riwayat transaksi: " + error.message, error.statusCode || 500);
    }
}

export async function GetFinancialReportByBranchService(month) {
    try {
        const targetMonth = month || new Date().toISOString().slice(0, 7);
        const reports = await dashboardDomain.GetFinancialReportByBranchDomain(targetMonth);

        return {
            success: true,
            message: 'Berhasil mengambil laporan performa cabang',
            data: {
                reports: reports
            },
        };
    } catch (error) {
        throw new CustomError("Gagal mengambil laporan cabang: " + error.message, error.statusCode || 500);
    }
}


export async function GetStockMutationLogService(branchName = null) {
    try {
        const stockLogs = await dashboardDomain.GetStockMutationLogDomain(branchName);

        return {
            success: true,
            message: 'Berhasil mengambil log mutasi stok',
            data: {
                stockLogs: stockLogs
            },
        };
    } catch (error) {
        throw new CustomError("Gagal mengambil log mutasi stok: " + error.message, error.statusCode || 500);
    }
}