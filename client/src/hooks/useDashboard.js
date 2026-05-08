import { useState, useEffect, useCallback, useMemo } from 'react';
import { dashboardService } from '../services/dashboardService';
import { message } from 'antd';

export const useDashboard = (user) => {
    const [loading, setLoading] = useState(true);
    const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
    
    const userId = user?.id;
    const userRole = user?.role;

    const [data, setData] = useState({
        stats: { omzet: 0, profit: 0 },
        transactions: [],
        lowStock: [],
        stockLogs: [],
        branchPerformance: []
    });

    const loadDashboardData = useCallback(async () => {
        if (!userId || !userRole) return;

        setLoading(true);
        try {
            const isOwner = userRole === 'owner';
            const isAdmin = userRole === 'admin';
            const isCashier = userRole === 'kasir';

            const promises = [
                dashboardService.getMonthlyStats(month),
                dashboardService.getTransactions({ 
                    isToday: isCashier
                })
            ];

            if (isOwner || isAdmin) {
                promises.push(dashboardService.getLowStock());
                promises.push(dashboardService.getStockMutationLogs());
            }

            if (isOwner) {
                promises.push(dashboardService.getBranchPerformance(month));
            }

            const results = await Promise.all(promises);
            const [resStats, resTrx, resLow, resLogs, resPerf] = results;

            setData({
                stats: { 
                    omzet: resStats?.data?.stats?.omzet, 
                    profit: resStats?.data?.stats?.profit, 
                    margin: resStats?.data?.stats?.omzet > 0 ? ((parseFloat(resStats?.data?.stats?.profit) / parseFloat(resStats?.data?.stats?.omzet)) * 100).toFixed(1) : 0, 
                },
                transactions: resTrx?.data?.transactions || [],
                lowStock: resLow?.data?.lowStock || [],
                stockLogs: resLogs?.data?.stockLogs || [],
                branchPerformance: resPerf?.data?.reports || []
            });

        } catch (error) {
            console.error("Dashboard Fetch Error:", error);
            message.error(error.response?.data?.message || "Gagal sinkronisasi data dashboard");
        } finally {
            setLoading(false);
        }
    }, [month, userId, userRole]); 

    useEffect(() => {
        loadDashboardData();
    }, [loadDashboardData]);

    const refresh = () => loadDashboardData();

    return {
        ...data,
        loading,
        month,
        setMonth,
        refresh
    };
};