import api from './api';

export const productService = {
    getAllProducts: async (params) => {
        const response = await api.get('/products', { params });
        return response.data;
    },

    createProduct: async (payload) => {
        const response = await api.post('/products', payload);
        return response.data;
    },

    updateProduct: async (id, payload) => {
        const response = await api.put(`/products/${id}`, payload);
        return response.data;
    },

    deleteProduct: async (id) => {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    },

    addStock: async (payload) => {
        const response = await api.post('/stocks', payload);
        return response.data;
    },

    getCategories: async () => {
        const response = await api.get('/categories');
        return response.data;
    },

    createCategory: async (payload) => {
        const response = await api.post('/categories', payload);
        return response.data;
    },

    updateCategory: async (id, payload) => {
        const response = await api.put(`/categories/${id}`, payload);
        return response.data;
    },

    deleteCategory: async (id) => {
        const response = await api.delete(`/categories/${id}`);
        return response.data;
    },

    getBranches: async () => {
        const response = await api.get('/branches');
        return response.data;
    },
};