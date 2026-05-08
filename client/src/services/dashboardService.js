import api from './api';

export const dashboardService = {
    getMonthlyStats: async (month) => {
        const response = await api.get('/reports/stats', { 
            params: { month } 
        });
        return response.data;
    },

    getTransactions: async (params) => {
        const response = await api.get('/reports/transactions', { params });
        return response.data;
    },

    getLowStock: async () => {
        const response = await api.get('/reports/low-stock');
        return response.data;
    },

    getStockMutationLogs: async () => {
        const response = await api.get('/reports/stock-logs');
        return response.data;
    },

    getBranchPerformance: async (month) => {
        const response = await api.get('/reports/branch-reports', { 
            params: { month } 
        });
        return response.data;
    }
};