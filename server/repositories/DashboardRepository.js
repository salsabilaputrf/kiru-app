import { AppDataSource } from '../configs/db.js';

const getQueryBuilder = (manager, viewName, alias) => {
    const connection = manager ? manager : AppDataSource;
    return connection.createQueryBuilder().from(viewName, alias);
};

export async function GetMonthlyFinanceStatsRepository(month, manager = null) {
    return await getQueryBuilder(manager, "v_dashboard_finance", "finance")
        .select([
            "SUM(finance.total_revenue) AS omzet",
            "SUM(finance.gross_profit) AS profit"
        ])
        .where("finance.transaction_month = :month", { month })
        .getRawOne() || { omzet: 0, profit: 0 };
}

export async function GetLowStockRepository(branchId = null, manager = null) {
    const qb = getQueryBuilder(manager, "v_dashboard_low_stock", "low_stock").select("*");
    if (branchId) {
        qb.where("low_stock.branch_id = :branchId", { branchId });
    }
    return await qb.getRawMany();
}

export async function GetDashboardTransactionsRepository({ branchName = null, isToday = false }, manager = null) {
    const qb = getQueryBuilder(manager, "v_dashboard_transactions", "trx")
        .select("*");

    if (branchName) {
        qb.andWhere("trx.branch_name = :branchName", { branchName });
    }

    if (isToday) {
        qb.andWhere("DATE(trx.transaction_date) = CURDATE()");
    }

    return await qb
        .orderBy("trx.transaction_date", "DESC")
        .getRawMany();
}

export async function GetFinancialReportByBranchRepository(month, manager = null) {
    return await getQueryBuilder(manager, "v_dashboard_finance", "finance")
        .select([
            "finance.branch_name",
            "finance.total_revenue",
            "finance.total_cost_basis",
            "finance.gross_profit"
        ])
        .where("finance.transaction_month = :month", { month })
        .getRawMany();
}

export async function GetStockMutationLogRepository(branchName = null, manager = null) {
    const qb = getQueryBuilder(manager, "v_dashboard_stock_status", "stock")
        .select("*");

    if (branchName) {
        qb.where("stock.branch_name = :branchName", { branchName });
    }

    return await qb
        .orderBy("stock.last_update", "DESC")
        .limit(20)
        .getRawMany();
}