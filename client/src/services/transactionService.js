import api from './api';

export const transactionService = {
    getAllTransactions: async (params) => {
        const response = await api.get('/transactions', { params });
        return response.data;
    },

    createTransaction: async (payload) => {
        const response = await api.post('/transactions', payload);
        return response.data;
    },

    getTransactionById: async (id) => {
        const response = await api.get(`/transactions/${id}`);
        return response.data;
    },

    voidTransaction: async (id) => {
        const response = await api.put(`/transactions/${id}/void`);
        return response.data;
    },
};