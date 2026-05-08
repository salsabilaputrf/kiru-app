import { userService } from '@/services/userService';
import { useState, useMemo, useCallback, useEffect } from 'react';
import {App as AntdApp} from 'antd';


export const useUser = () => {
    const { message } = AntdApp.useApp();
    const [filters, setFilters] = useState({
        search: '',
        role: 'all',
        status: 'all', 
        page: 1,
        limit: 3
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const result = await userService.getAllUsers();

            setUsers(result.data?.users); 
        } catch (error) {
            console.error("Gagal mengambil data user:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, [filters]);

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const roleName = user.role.toLowerCase();
            const search = filters.search.toLowerCase();
            
            const matchesRole = filters.role === 'all' || roleName === filters.role.toLowerCase();
            const matchesStatus = filters.status === 'all' || user.status.toLowerCase() === filters.status.toLowerCase();
            
            const matchesSearch = 
                user.name.toLowerCase().includes(search) || 
                user.email.toLowerCase().includes(search) || 
                user.branch.toLowerCase().includes(search) ||
                roleName.includes(search);

            return matchesRole && matchesSearch && matchesStatus;
        });
    }, [filters, users]);

    const total = filteredUsers.length;

    const paginatedUsers = useMemo(() => {
        const startIndex = (filters.page - 1) * filters.limit;
        return filteredUsers.slice(startIndex, startIndex + filters.limit);
    }, [filteredUsers, filters.page, filters.limit]);

    const openAddModal = useCallback(() => {
        setEditingUser(null);
        setIsModalVisible(true);
    }, []);

    const openEditModal = useCallback((user) => {

        setEditingUser(user);
        setIsModalVisible(true);
    }, []);

    const resetFilters = useCallback(() => {
        setFilters({
            search: '',
            role: 'all',
            status: 'all',
            page: 1,
            limit: 3
        });
    }, []);

    const handleSaveUser = async (values) => {
        setLoading(true);
        try {
            const payload = {
                name: values.name,
                email: values.email,
                username: values.username,
                role: values.role,
                branch: values.branch,
                status: values.status || 'active',
            };

            if (values.password) {
                payload.password = values.password;
            }

            if (editingUser) {
                await userService.updateUser(editingUser.id, payload);
   
            } else {
                await userService.createUser(payload);
    
            }
            setIsModalVisible(false);
            setEditingUser(null); 

            await fetchUsers(); 
            message.success(editingUser ? "Data berhasil diubah" : "User baru berhasil ditambahkan");
        } catch (error) {
            console.error("Failed to save user:", error);
        } finally {
            setLoading(false);
        }
    };

    return {
    
            filteredUsers, 
            filters,
            isModalVisible,
            editingUser,
            loading,
            paginatedUsers,
            total,
            setFilters,
            setIsModalVisible,
            openAddModal,
            openEditModal,
            resetFilters,
            handleSaveUser
        
    };
};