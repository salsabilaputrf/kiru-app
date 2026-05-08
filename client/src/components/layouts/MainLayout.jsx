import React from 'react';
import { Layout, Menu, Button, Avatar, Space, Typography, Dropdown } from 'antd';
import { Link } from "react-router-dom";
import logoKiru from "@/assets/kiru_logo_only.svg";
import {
    AlignLeftOutlined,
    MenuOutlined,
    UserOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { ModalProfile } from '../Modal';
import { useMainLayout } from '@/hooks/useMainLayout';
import { getAvatarItems, getSidebarItems } from '@/configs/menuConfig';
import { useProfile } from "@/hooks/useProfile";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;


export default function MainLayout({ children, title }) {
    const {
        screens, collapsed, setCollapsed, currentTime,
        isProfileOpen, setIsProfileOpen, getSelectedKey,
        handleLogout, siderWidth, navigate, userData
    } = useMainLayout();

    const sidebarItems = getSidebarItems(navigate, userData?.role);
    const avatarItems = getAvatarItems(() => setIsProfileOpen(true), handleLogout);

    return (
        <Layout className="min-h-screen">
            {/* Sidebar */}
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={288}
                collapsedWidth={screens.xs ? 0 : 80} 
                className="!bg-white border-r border-gray-100 shadow-sm"
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    zIndex: 1001,
                }}
            >
                <div className="p-6 h-24 flex items-center justify-center">
                    <Link to="/" className="flex items-center gap-3">
                        <img 
                            src={logoKiru} 
                            alt="Logo Kiru" 
                            className={`transition-all duration-300 ${collapsed ? 'w-10 h-10' : 'w-8 h-8'} rounded-xl`} 
                        />
                        {!collapsed && (
                            <Title level={screens.xl ? 2 : 3} className="!m-0 !font-black !tracking-tighter !text-kiru-primary">
                                KIRU.
                            </Title>
                        )}
                    </Link>
                </div>

                <Menu
                    mode="inline"
                    selectedKeys={[getSelectedKey()]}
                    className="!border-none px-4 font-semibold"
                    items={sidebarItems}
                />
            </Sider>

            <Layout 
                className="bg-kiru-background transition-all duration-300"
                style={{ marginLeft: siderWidth }}
            >
                {/* Header */}
                <Header 
                    className="!bg-white !px-4 md:!px-8 h-20 md:h-24 flex items-center justify-between border-b border-gray-50 shadow-sm"
                    style={{ 
                        position: 'fixed', 
                        top: 0, 
                        zIndex: 1000, 
                        width: `calc(100% - ${siderWidth}px)`,
                        transition: 'all 0.3s'
                    }}
                >
                    <Space size={screens.xs ? 4 : 16}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuOutlined /> : <AlignLeftOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            className="text-lg flex items-center justify-center w-10 h-10 md:w-12 md:h-12"
                        />
                        <Title 
                            level={screens.xs ? 5 : 4} 
                            className="!m-0 !uppercase !tracking-tight !text-gray-800 truncate max-w-[120px] sm:max-w-none"
                        >
                            {title}
                        </Title>
                    </Space>

                    <Space size={screens.xs ? "small" : "middle"} align="center">
						{!screens.xs && (
							<div className="text-right border-r border-gray-200 pr-4 mr-2 hidden md:flex flex-col justify-center">
								<p className="m-0 text-[12px] font-bold text-gray-800 leading-none mb-1">
									{currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
								</p>
								<span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none">
									{currentTime.toLocaleDateString('id-ID', { 
										weekday: 'long', 
										day: 'numeric', 
										month: 'long', 
										year: 'numeric' 
									})}
								</span>
							</div>
						)}

                        <div className="text-right hidden sm:flex flex-col justify-center mr-3">
							<p className="m-0 text-[12px] lg:text-sm font-bold text-gray-800 leading-none mb-1">
								{userData.name}
							</p>
							<div className="flex justify-end">
								<span className="text-[9px] lg:text-[10px] text-green-500 font-black uppercase tracking-wider leading-none bg-green-50 px-1.5 py-0.5 rounded-md border border-green-100">
									● {userData.role}
								</span>
							</div>
						</div>

                        {/* Avatar */}
                        <Dropdown menu={{ items: avatarItems }} trigger={['click']} placement="bottomRight">
                            <Avatar 
                                size={screens.xs ? 36 : 48} 
                                icon={<UserOutlined />}
                                className="bg-violet-100 text-violet-600 border-2 border-white shadow-sm cursor-pointer hover:scale-105 transition-all"
                            />
                        </Dropdown>
                    </Space>
                </Header>

                <Content 
                    className="min-h-screen" 
                    style={{ marginTop: screens.xs ? 80 : 84 }}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-3 sm:p-6  lg:p-9 "
                    >
                        {children}
                    </motion.div>
                </Content>
            </Layout>

            <ModalProfile 
                isVisible={isProfileOpen} 
                onCancel={() => setIsProfileOpen(false)} 
               
            />
        </Layout>
    );


}

