import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, App as AntdApp } from 'antd';
import { authService } from '@/services/authService';

const { useBreakpoint } = Grid;

export const useMainLayout = () => {
    const screens = useBreakpoint();
    const [collapsed, setCollapsed] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [userData, setUserData] = useState({ name: 'Guest', role: 'Unknown' });
    
    const location = useLocation();
    const navigate = useNavigate();
    const { message } = AntdApp.useApp();

    useEffect(() => {
        if (screens.md === false) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    }, [screens.md]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user_detail'); 
        if (storedUser) {
            try {
                setUserData(JSON.parse(storedUser));
            } catch (error) {
                console.error("Gagal parse data user:", error);
            }
        }
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const getSelectedKey = () => {
        const path = location.pathname;
        if (path.startsWith('/dashboard')) return '1';
        if (path.startsWith('/pos')) return '2';
        if (path.startsWith('/inventory')) return '3';
        if (path.startsWith('/users')) return '4';
        return '1';
    };

    const handleLogout = () => {
        message.loading('Sedang keluar...', 0.5).then(() => {
            authService.logout();
            message.success('Berhasil keluar');
            setTimeout(() => {
                window.location.href = '/login';
            }, 500);
        });
    };

    const siderWidth = collapsed ? (screens.xs ? 0 : 80) : 288;

    return {
        screens,
        collapsed,
        setCollapsed,
        currentTime,
        isProfileOpen,
        setIsProfileOpen,
        getSelectedKey,
        handleLogout,
        siderWidth,
        navigate,
        userData
    };
};