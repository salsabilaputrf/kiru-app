import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { App as AntdApp } from 'antd';
import { authService } from '@/services/authService';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { message } = AntdApp.useApp();

    const handleLogin = async (username, password) => {
        setLoading(true);
        try {
            const result = await authService.login(username, password);
            
            if (result?.data?.accessToken) {
                message.success('Login berhasil! Selamat datang.');
                navigate('/kiru-app');
                return result;
            } else {
                throw new Error("Gagal mendapatkan kunci akses dari server");
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || 'Login gagal, periksa koneksi Anda';
            message.error(errorMsg);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { handleLogin, loading };
};