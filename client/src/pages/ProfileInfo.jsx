import React from 'react';
import { Card, Avatar, Tag, Row, Col, Typography, Divider, Space } from 'antd';
import { 
    MailOutlined, 
    SafetyCertificateOutlined, 
    BankOutlined, 
    CalendarOutlined, 
    CheckCircleOutlined,
    UserOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layouts/MainLayout';

const { Title, Text } = Typography;

export default function ProfilePage() {
    const userData = {
        name: "Admin Salsabila",
        username: "@salsabila_putri",
        email: "salsabila@kiru.id",
        role: "SUPER ADMIN",
        branch: "Bandung Utama",
        joinDate: "15 Oktober 2023",
        status: "Active"
    };

    return (
        <MainLayout title="Profile Info">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card 
                        className="overflow-hidden !rounded-3xl shadow-xl border-none"
                        styles={{ body: { padding: 0 } }}
                    >
                        <div className="h-32 md:h-44 bg-gradient-to-r from-violet-600 to-indigo-600" />

                        <div className="px-6 md:px-12 pb-12">
                            <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-20 mb-8 gap-6">
                                <Avatar 
                                    size={{ xs: 120, sm: 140, md: 160, lg: 180 }}
                                    icon={<UserOutlined />}
                                    className="border-4 border-white shadow-2xl bg-violet-100 text-violet-600"
                                />
                                <div className="text-center md:text-left mb-2">
                                    <Title level={2} className="!m-0 !font-black !tracking-tight">
                                        {userData.name}
                                    </Title>
                                    <Text className="text-gray-400 text-lg font-medium">
                                        {userData.username}
                                    </Text>
                                </div>
                            </div>

                            <Divider className="my-8" />

                            <div className="mb-6">
                                <Title level={4} className="!font-black !tracking-widest !uppercase !text-gray-400 mb-8">
                                    Detail Akun
                                </Title>

                                <Row gutter={[32, 32]}>
                                    <Col xs={24} sm={12} md={8}>
                                        <Space orientation="vertical" size={4}>
                                            <Space className="text-violet-500 font-bold uppercase text-[10px] tracking-widest">
                                                <MailOutlined /> Email Utama
                                            </Space>
                                            <Text className="text-base font-semibold text-gray-800 block">
                                                {userData.email}
                                            </Text>
                                        </Space>
                                    </Col>

                                    <Col xs={24} sm={12} md={8}>
                                        <Space orientation="vertical" size={4}>
                                            <Space className="text-violet-500 font-bold uppercase text-[10px] tracking-widest">
                                                <SafetyCertificateOutlined /> Hak Akses (Role)
                                            </Space>
                                            <div>
                                                <Tag color="purple" className="!rounded-full px-4 font-black border-none shadow-sm">
                                                    {userData.role}
                                                </Tag>
                                            </div>
                                        </Space>
                                    </Col>

                                    <Col xs={24} sm={12} md={8}>
                                        <Space orientation="vertical" size={4}>
                                            <Space className="text-violet-500 font-bold uppercase text-[10px] tracking-widest">
                                                <BankOutlined /> Cabang Terdaftar
                                            </Space>
                                            <Text className="text-base font-semibold text-gray-800 block">
                                                {userData.branch}
                                            </Text>
                                        </Space>
                                    </Col>

                                    <Col xs={24} sm={12} md={8}>
                                        <Space orientation="vertical" size={4}>
                                            <Space className="text-violet-500 font-bold uppercase text-[10px] tracking-widest">
                                                <CalendarOutlined /> Bergabung Sejak
                                            </Space>
                                            <Text className="text-base font-semibold text-gray-800 block">
                                                {userData.joinDate}
                                            </Text>
                                        </Space>
                                    </Col>

                                    <Col xs={24} sm={12} md={8}>
                                        <Space orientation="vertical" size={4}>
                                            <Space className="text-violet-500 font-bold uppercase text-[10px] tracking-widest">
                                                <CheckCircleOutlined /> Status Akun
                                            </Space>
                                            <Space className="text-base font-bold text-gray-800">
                                                <span className="w-2 h-2 rounded-full bg-green-500 block" />
                                                {userData.status}
                                            </Space>
                                        </Space>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </MainLayout>
        
    );
}