import React, { useState, useMemo } from 'react';
import { 
    Card, 
    Input, 
    Select, 
    Button, 
    Row, 
    Col, 
    Avatar, 
    Tag, 
    Dropdown, 
    Pagination, 
    Flex, 
    Typography, 
    Tooltip,
    Empty,
    Spin
} from 'antd';
import { 
    SearchOutlined, 
    FilterOutlined, 
    EditOutlined, 
    StopOutlined, 
    MoreOutlined, 
    UserAddOutlined,
    SafetyCertificateOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layouts/MainLayout';
import { ModalUser } from '@/components/Modal';
import { useUser } from '@/hooks/useUser';

const { Title, Text } = Typography;

export default function UserManagement() {
    const { 
        filteredUsers,
        total,
        filters,
        isModalVisible,
        editingUser,
        loading,
    
        paginatedUsers,
        setFilters,
        setIsModalVisible,
        openAddModal,
        openEditModal,
        resetFilters,
        handleSaveUser
    } = useUser();

    const getRoleColor = (role) => {
        if (role === 'owner') return 'purple';
        if (role === 'admin') return 'blue';
        if (role === 'kasir') return 'yellow';
        return 'default';
    };

    return (
        <MainLayout title="User Management">
            <div className="space-y-8 flex flex-col gap-8">
                <Flex justify="space-between" align="center" className="flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-violet-100 text-violet-600 rounded-2xl shadow-sm">
                            <SafetyCertificateOutlined className="text-2xl" />
                        </div>
                        <div>
                            <Title level={3} className="!m-0 !font-black !tracking-tight">Kelola hak akses dan staf operasional</Title>
                            
                        </div>
                    </div>
                    <Button 
                        type="primary" 
                        icon={<UserAddOutlined />} 
                        size="large"
                        onClick={() => openAddModal(true)}
                        className="!bg-violet-600 hover:!bg-violet-700 !rounded-xl !h-12 !px-6 font-bold shadow-lg shadow-violet-200 border-none"
                    >
                        Tambah User Baru
                    </Button>
                </Flex>

                <Card className="!rounded-3xl border-none shadow-sm mb-8" styles={{ body: { padding: '24px' } }}>
                    <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} md={12} lg={16}>
                            <Input 
                                placeholder="Cari nama, email, atau lokasi cabang..." 
                                prefix={<SearchOutlined className="text-gray-400 mr-2" />} 
                                className="!rounded-2xl !py-3 bg-gray-50 border-none hover:bg-gray-100 focus:bg-white transition-all"
                                value={filters.search}
                                onChange={e => setFilters(prev => ({ 
                                    ...prev, 
                                    search: e.target.value
                                   
                                }))}
                            />
                        </Col>
                        <Col xs={24} md={12} lg={8}>
                            <Flex gap={12}>
                                <Select 
                                    value={filters.status}
                                    className="w-full !h-12 custom-select"
                                    onChange={value => setFilters(prev => ({ 
                                        ...prev, 
                                        status: value
                                    
                                    }))}
                                    options={[
                                        { value: 'all', label: 'Semua Status' },
                                        { value: 'active', label: 'Aktif' },
                                        { value: 'inactive', label: 'Non-Aktif' },
                                        { value: 'banned', label: 'Banned' },
                                    ]}
                                />
                            </Flex>
                        </Col>
                        <Col xs={24} md={12} lg={8}>
                            <Flex gap={12}>
                                <Select 
                                    value={filters.role}
                                    className="w-full !h-12 custom-select"
                                    onChange={value => setFilters(prev => ({ 
                                        ...prev, 
                                        role: value
                                    
                                    }))}
                                    options={[
                                        { value: 'all', label: 'Semua Role' },
                                        { value: 'owner', label: 'Owner' },
                                        { value: 'admin', label: 'Admin' },
                                        { value: 'kasir', label: 'Kasir' },
                                    ]}
                                />
                                <Button icon={<FilterOutlined />} className="!h-12 !w-12 !rounded-xl !flex items-center justify-center bg-gray-50 border-none" onClick={resetFilters} />
                            </Flex>
                        </Col>
                    </Row>
                </Card>

                <Spin spinning={loading}>
                    <Row gutter={[24, 24]}>
                        <AnimatePresence>
                            {paginatedUsers.map((user, index) => (
                                <Col xs={24} sm={12} lg={8} key={user.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -5 }}
                                    >
                                        <Card className="!rounded-3xl border-none shadow-md hover:shadow-xl transition-all overflow-hidden group">
                                            <Flex justify="space-between" align="start" className="mb-6">
                                                <Avatar 
                                                    size={64} 
                                                    className="bg-violet-50 text-violet-600 border-none font-black text-xl shadow-inner"
                                                >
                                                    {user.name.charAt(0)}
                                                </Avatar>
                                                <div className="flex flex-col items-end gap-2">
                                                    <Tag color={getRoleColor(user.role)} className="!rounded-full px-3 font-bold border-none !m-0">
                                                        {user.role}
                                                    </Tag>
                                                    <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${user.status === 'Active' ? 'text-green-500' : 'text-gray-400'}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                                                        {user.status}
                                                    </span>
                                                </div>
                                            </Flex>

                                            <div className="mb-6">
                                                <Title level={5} className="!m-0 !font-black truncate">{user.name}</Title>
                                                <Text className="text-gray-400 block mb-3 font-medium">{user.email}</Text>
                                                <Flex align="center" gap={8} className="text-gray-500 text-xs font-semibold bg-gray-50 p-2 rounded-xl inline-flex">
                                                    <CheckCircleOutlined className="text-violet-500" />
                                                    {user.branch}
                                                </Flex>
                                            </div>

                                            <div className="pt-4 border-t border-gray-50 flex gap-2">
                                                <Button 
                                                    block 
                                                    icon={<EditOutlined />} 
                                                    onClick={() => openEditModal(user)}
                                                    className="!rounded-xl font-bold hover:!text-violet-600 hover:!border-violet-600"
                                                >
                                                    Edit User
                                                </Button>
                                                
                                            </div>
                                        </Card>
                                    </motion.div>
                                </Col>
                            ))}
                        </AnimatePresence>
                    </Row>
                </Spin>
                

                {/* Pagination */}
                <Flex justify="center" className="mt-12">
                    <Pagination 
                        current={filters.page} 
                        total={total} 
                        pageSize={filters.limit}
                        onChange={(page) => setFilters(prev => ({ ...prev, page }))}
                        showSizeChanger={false}
                        className="custom-pagination"
                    />
                </Flex>

                <ModalUser 
                    isVisible={isModalVisible} 
                    onCancel={() => setIsModalVisible(false)} 
                    onSave={handleSaveUser}
                    initialData={editingUser}
                />
            </div>
        </MainLayout>
        
    );
}