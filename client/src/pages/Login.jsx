import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, App as AntdApp } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/layouts/AuthLayout"; // Menggunakan alias @
import logoKiru from "@/assets/kiru_logo_only.svg";
import api from "@/services/api";
import { useAuth } from "@/hooks/useAuth";

const { Text } = Typography;

export default function Login() {
    const [form] = Form.useForm();

    const { handleLogin, loading } = useAuth();

    const onFinish = async (values) => {
        await handleLogin(values.username, values.password);
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-[450px] mx-auto px-4 sm:px-0">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                    <Link to="/" className="flex items-center gap-3">
                        <img 
                            src={logoKiru} 
                            alt="Logo Kiru" 
                            className="w-10 h-10 shrink-0" 
                        />
                        <div className="flex flex-col leading-none gap-0.5">
                            <div className="flex items-baseline">
                                <span className="text-[22px] font-thin tracking-widest text-kiru-primary" style={{ fontFamily: 'Helvetica Neue, Arial' }}>ki</span>
                                <span className="text-[22px] font-bold tracking-widest text-kiru-primary" style={{ fontFamily: 'Helvetica Neue, Arial' }}>ru</span>
                            </div>
                            <span className="text-[7.5px] tracking-[0.28em] text-purple-300 leading-tight">
                                CARA CERDAS KELOLA TOKO
                            </span>
                        </div>
                    </Link>
                    
                    <div className="group flex items-center gap-2 bg-green-50 px-4 py-1.5 rounded-full border border-kiru-online/20 transition-all duration-300 hover:bg-kiru-online">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kiru-online opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-kiru-online group-hover:bg-white"></span>
                        </span>
                        <span className="text-kiru-online font-bold text-[10px] sm:text-xs tracking-widest group-hover:text-white transition-colors">
                            ONLINE
                        </span>
                    </div>
                </div>

                {/* Form */}
                <Card 
                    className="border-gray-50 rounded-3xl shadow-xl shadow-purple-500/5"
                    styles={{ body: { padding: 'clamp(1.5rem, 5vw, 2.5rem)' } }} 
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        requiredMark={false}
                        className="w-full"
                    >
                        <Form.Item
                            label={<Text className="font-semibold text-kiru-text-main">Username</Text>}
                            name="username"
                            rules={[{ required: true, message: 'Silahkan masukkan username!' }]}
                        >
                            <Input size="large" placeholder="Masukkan Username" className="rounded-xl h-12" disabled={loading} />
                        </Form.Item>

                        <Form.Item
                            label={<Text className="font-semibold text-kiru-text-main">Password</Text>}
                            name="password"
                            rules={[{ required: true, message: 'Silahkan masukkan password!' }]}
                        >
                            <Input.Password size="large" placeholder="Masukkan Password" className="rounded-xl h-12" disabled={loading} />
                        </Form.Item>

                        <Form.Item className="mb-2 mt-8">
                            <Button 
                                loading={loading}
                                type="primary" 
                                htmlType="submit" 
                                block 
                                size="large"
                                className="h-12 rounded-xl font-bold !bg-kiru-primary hover:!bg-kiru-primary-hover border-none shadow-lg shadow-purple-200"
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </AuthLayout>
    );
}