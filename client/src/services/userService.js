import { message } from 'antd';
import api from './api'

export const userService = {
    getAllUsers: async (params) => {
        const response = await api.get('/users', { params });
        return response.data; 
    },
    
    createUser: async (payload) => {
        const response = await api.post('/users', payload);
        return response.data;
    },
    
    updateUser: async (id, payload) => {
        try {
            const response = await api.put(`/users/${id}`, payload);
            return response.data; 
            
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Gagal memperbarui user';
            message.error(errorMessage);
            throw error; 
        }
    },
    
    getRoles: async () => {
        const response = await api.get('/roles');
        return response.data; 
    },

    getBranches: async () => {
        const response = await api.get('/branches');
        return response.data; 
    }
}