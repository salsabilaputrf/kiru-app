import * as dashboardRepo from '../repositories/DashboardRepository.js';

export async function GetMonthlyFinanceStatsDomain(month, manager) {
    return await dashboardRepo.GetMonthlyFinanceStatsRepository(month, manager);
}

export async function GetLowStockDomain(branchId, manager) {
    return await dashboardRepo.GetLowStockRepository(branchId, manager);
}

export async function GetDashboardTransactionsDomain(params, manager) {
    return await dashboardRepo.GetDashboardTransactionsRepository(params, manager);
}

export async function GetFinancialReportByBranchDomain(month, manager) {
    return await dashboardRepo.GetFinancialReportByBranchRepository(month, manager);
}

export async function GetStockMutationLogDomain(branchName, manager) {
    return await dashboardRepo.GetStockMutationLogRepository(branchName, manager);
}