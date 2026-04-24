import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Space, Typography } from 'antd';
import { Link } from "react-router-dom";
import logoKiru from "@/assets/kiru_logo_only.svg";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	DashboardOutlined,
	TransactionOutlined,
	InboxOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

export default function DashboardLayout({ children, title }) {
	const [collapsed, setCollapsed] = useState(false);

	// Variabel untuk memudahkan kalkulasi margin
	const siderWidth = collapsed ? 80 : 288;

	return (
		<Layout className="min-h-screen">
			{/* Fixed Sider */}
			<Sider
				trigger={null}
				collapsible
				collapsed={collapsed}
				width={288}
				className="!bg-white border-r border-gray-100 hidden md:block"
				style={{
					overflow: 'auto',
					height: '100vh',
					position: 'fixed',
					left: 0,
					top: 0,
					bottom: 0,
					zIndex: 1000,
				}}
			>
				<div className="p-8 h-24 flex items-center justify-center transition-all duration-300">
					<Link to="/" className="flex items-center gap-3">
						<img 
							src={logoKiru} 
							alt="Logo Kiru" 
							className={`transition-all duration-300 ${
								collapsed ? 'w-10 h-10' : 'w-8 h-8'
							} rounded-xl object-contain`} 
						/>
						
						{!collapsed && (
							<Title 
								level={2} 
								className="!m-0 !font-black !tracking-tighter !text-kiru-primary whitespace-nowrap"
							>
								KIRU.
							</Title>
						)}
					</Link>
				</div>

				<Menu
					mode="inline"
					defaultSelectedKeys={['1']}
					className="!border-none px-4 font-semibold"
					items={[
						{
							key: '1',
							icon: <DashboardOutlined />,
							label: 'Dashboard',
							className: '!rounded-2xl !py-6 my-1',
						},
						{
							key: '2',
							icon: <TransactionOutlined />,
							label: 'Transaksi',
							className: '!rounded-2xl !py-6 my-1',
						},
						{
							key: '3',
							icon: <InboxOutlined />,
							label: 'Stok Barang',
							className: '!rounded-2xl !py-6 my-1',
						},
					]}
				/>
			</Sider>

			{/* Main Layout Area */}
			<Layout 
				className="bg-kiru-background transition-all duration-200"
				style={{ marginLeft: siderWidth }} // Memberi ruang agar tidak tertutup Sider
			>
				{/* Fixed Header */}
				<Header 
					className="!bg-white !px-8 h-24 flex items-center justify-between border-b border-gray-50"
					style={{ 
						position: 'fixed', 
						top: 0, 
						zIndex: 999, 
						width: `calc(100% - ${siderWidth}px)`, // Lebar header mengikuti sisa layar
						transition: 'width 0.2s'
					}}
				>
					<Space>
						<Button
							type="text"
							icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
							onClick={() => setCollapsed(!collapsed)}
							className="text-lg w-12 h-12"
						/>
						<Title level={4} className="!m-0 !uppercase !tracking-tight !text-gray-800">
							{title}
						</Title>
					</Space>

					<Space size="middle" align="center" className="h-full flex items-center">
						<div className="text-right hidden sm:flex flex-col justify-center">
							<p className="m-0 text-sm font-bold text-gray-800 leading-tight">
								Admin Salsabila
							</p>
							{/* Menggunakan div atau span biasa agar tidak terpengaruh line-height Typography.Text */}
							<span className="text-[10px] text-kiru-online font-bold uppercase tracking-wider leading-none">
								Online
							</span>
						</div>
						
						<Avatar 
							size={48} 
							className="bg-kiru-secondary text-kiru-primary font-bold border-2 border-white shadow-sm flex items-center justify-center shrink-0"
						>
							S
						</Avatar>
					</Space>
				</Header>

				{/* Content Area */}
				<Content 
					className="min-h-screen" 
					style={{ marginTop: 96 }} // Margin top 96px (setara h-24) agar tidak tertutup Header
				>
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4 }}
						className="p-8 md:p-12"
					>
						{children}
					</motion.div>
				</Content>
			</Layout>
		</Layout>
	);
}