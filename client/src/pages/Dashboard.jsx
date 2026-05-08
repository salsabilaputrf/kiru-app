import React, { useMemo } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { 
  Row, Col, Card, Statistic, Table, Tag, Button, 
  DatePicker, Select, Space, Typography, Flex, Skeleton
} from 'antd';
import { 
  HistoryOutlined, 
  PlusCircleOutlined, ArrowUpOutlined, ArrowDownOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useDashboard } from '@/hooks/useDashboard';

const { Title, Text } = Typography;

const COLORS = {
    indigo: { bg: '#eef2ff', border: '#c7d2fe', value: '#4f46e5', sub: '#818cf8' },
    red:    { bg: '#fef2f2', border: '#fecaca', value: '#dc2626', sub: '#f87171' },
    green:  { bg: '#f0fdf4', border: '#bbf7d0', value: '#16a34a', sub: '#4ade80' },
    default:{ bg: '#ffffff', border: '#e5e7eb', value: 'inherit', sub: '#9ca3af' },
};

const StatCard = ({ title, value, subValue, color, trend, loading }) => {
    const c = COLORS[color] || COLORS.default;
    return (
        <Card 
            className="shadow-sm h-full rounded-2xl" 
            style={{ background: c.bg, borderColor: c.border }}
        >
            {loading ? <Skeleton active paragraph={{ rows: 1 }} /> : (
                <>
                    <Text style={{ fontSize: 10, color: c.sub, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{title}</Text>
                    <Title level={3} style={{ margin: '4px 0', color: c.value }}>{value}</Title>
                    <Flex gap={4} align="center">
                        {trend && (
                            <Text style={{ fontSize: 12, color: trend > 0 ? '#22c55e' : '#ef4444' }}>
                                {trend > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {trend}%
                            </Text>
                        )}
                        <Text style={{ fontSize: 10, color: c.sub }}>{subValue}</Text>
                    </Flex>
                </>
            )}
        </Card>
    );
};

const LowStockItem = ({ name, stock, branch }) => (
    <Flex justify="space-between" align="center" className="p-3 mb-2 rounded-xl bg-red-50 border border-red-100">
        <div>
            <div className="text-xs font-bold text-gray-800">{name}</div>
            {branch && <div className="text-[10px] text-gray-400">{branch}</div>}
        </div>
        <div className="text-xs font-bold text-red-600">Sisa {stock}</div>
    </Flex>
);

export default function Dashboard() {
	const user = useMemo(() => JSON.parse(localStorage.getItem('user_detail')) || {}, []);
	const userRole = user?.role;

	const isOwner = userRole === 'owner';
    const isAdmin = userRole === 'admin';
    const isCashier = userRole === 'kasir';
	const { 
		stats,
        transactions,
        lowStock,
		stockLogs,
		branchPerformance,
        loading,
        month,
        setMonth,
        refresh
	} = useDashboard(user);

		const jumlahCabang = useMemo(() => {
    return new Set(lowStock.map(item => item.branch_id)).size;
}, [lowStock]);

	const formatMonth = (monthStr) => {
		 if (!monthStr) return '';
    const [year, month] = monthStr.split('-');
    return new Date(year, month - 1).toLocaleDateString('id-ID', { 
        month: 'long', year: 'numeric' 
    });
};

const todayStats = useMemo(() => {
    const today = new Date().toDateString();

    const todayTrx = transactions.filter(trx => 
        new Date(trx.transaction_date).toDateString() === today
    );

    const totalPenjualan = todayTrx.reduce((sum, trx) => 
        sum + parseFloat(trx.total_amount), 0
    );

    const lastTrx = todayTrx[0]; 

    return {
        count: todayTrx.length,
        totalPenjualan,
        lastTime: lastTrx 
            ? new Date(lastTrx.transaction_date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
            : '-',
        lastId: lastTrx 
            ? `#${lastTrx.transaction_id.slice(0, 8).toUpperCase()} • Rp ${Number(lastTrx.total_amount).toLocaleString('id-ID')}`
            : '-',
    };
}, [transactions]);

const formatRupiah = (value) => {
    const num = parseFloat(value) || 0;  
    if (num >= 1_000_000) return `Rp ${(num / 1_000_000).toLocaleString('id-ID', { maximumFractionDigits: 1 })} jt`;
    if (num >= 1_000) return `Rp ${(num / 1_000).toLocaleString('id-ID', { maximumFractionDigits: 1 })} rb`;
    return `Rp ${num.toLocaleString('id-ID')}`;
};

    const transactionColumns = [
    { 
        title: 'ID', 
        dataIndex: 'transaction_id',        
        key: 'id', 
        render: id => <Text className="font-mono text-[10px]">{id?.slice(0, 8).toUpperCase()}...</Text> 
    },
    ...(isOwner || isAdmin ? [{ 
        title: 'Kasir', 
        dataIndex: 'cashier_name',          
        key: 'cashier' 
    }] : []),
    ...(isOwner ? [{ 
        title: 'Cabang', 
        dataIndex: 'branch_name',           
        key: 'branch',
        render: b => <Tag color="blue" className="border-none rounded-full px-3 text-[10px]">{b}</Tag>
    }] : []),
    { 
        title: 'Total', 
        dataIndex: 'total_amount',         
        key: 'total', 
        render: val => <Text strong>Rp {Number(val).toLocaleString('id-ID')}</Text>  
    },
    { 
        title: 'Item', 
        dataIndex: 'total_items',           
        key: 'items',
        render: val => <Text className="text-gray-500 text-xs">{Math.floor(val)} item</Text>
    },
    { 
		title: 'Waktu', 
		dataIndex: 'transaction_date',
		key: 'time',
		render: date => (
			<div>
				<div className="text-xs font-medium">
					{new Date(date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
				</div>
				<div className="text-[10px] text-gray-400">
					{new Date(date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
				</div>
			</div>
		)
	},
];

    const stockLogColumns = [
    { 
        title: 'Produk', 
        dataIndex: 'product_name',         
        key: 'product', 
        render: text => <Text strong className="text-xs">{text}</Text> 
    },
    { 
        title: 'Stok', 
        dataIndex: 'stock_qty',           
        key: 'qty', 
        render: qty => <Text className="text-indigo-600 font-bold">{Math.floor(qty)} pcs</Text> 
    },
    { 
        title: 'Harga Jual', 
        dataIndex: 'selling_price',       
        key: 'price',
        render: val => <Text className="text-xs">Rp {Number(val).toLocaleString('id-ID')}</Text>
    },
    ...(isOwner ? [{ 
        title: 'Cabang', 
        dataIndex: 'branch_name',          
        key: 'branch', 
        render: b => <Tag color="orange" className="text-[10px] border-none">{b}</Tag> 
    }] : []),
    { 
        title: 'Update', 
        dataIndex: 'last_update',       
        key: 'date', 
        render: d => <Text className="text-gray-400 text-[10px]">{new Date(d).toLocaleDateString('id-ID')}</Text> 
    },
];

    return (
        <MainLayout title="Dashboard">
            <div className="p-2 md:p-4 bg-[#F8F9FA] min-h-screen">
                
                {isCashier && (
                    <div className="bg-indigo-600 p-6 rounded-3xl mb-6 text-white shadow-lg shadow-indigo-100">
                        <Title level={4} className="!text-white !m-0">👋 Selamat datang, Kasir!</Title>
                        <Text className="text-indigo-100 block tracking-wide">Shift Berjalan • {user.branch}</Text>
                    </div>
                )}

                <Row gutter={[16, 16]} className="mb-6">
					{isOwner ? (
						<>
							<Col xs={24} sm={12} lg={6}>
								<StatCard 
									loading={loading}
									title="Total Penjualan" 
									value={`Rp ${(stats.omzet / 1_000_000).toLocaleString('id-ID')} jt`}
									subValue={formatMonth(month)}
									color="indigo" 
								/>
							</Col>
							<Col xs={24} sm={12} lg={6}>
								<StatCard 
									loading={loading}
									title="Keuntungan" 
									value={formatRupiah(stats.profit)}
									subValue="Estimasi Laba"
								/>
							</Col>
							<Col xs={24} sm={12} lg={6}>
								<StatCard 
									loading={loading}
									title="Margin Laba" 
									value={`${stats.margin}%`}
									subValue="Target: 28%"
								/>
							</Col>
							<Col xs={24} sm={12} lg={6}>
								<StatCard 
									loading={loading}
									title="Stok Menipis" 
									value={`${lowStock.length} item`}
									subValue={`Di ${jumlahCabang} cabang`}
									color="red" 
								/>
							</Col>
						</>
					) : (
						<>
							{isCashier && (
								<>
									<Col xs={24} sm={8}>
										<StatCard 
											loading={loading}
											title="Transaksi Hari Ini" 
											value={todayStats.count}
											subValue={new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
											color="indigo"
										/>
									</Col>
									<Col xs={24} sm={8}>
										<StatCard 
											loading={loading}
											title="Total Penjualan" 
											value={`Rp ${todayStats.totalPenjualan.toLocaleString('id-ID')}`}
											subValue="Shift ini"
										/>
									</Col>
									<Col xs={24} sm={8}>
										<StatCard 
											loading={loading}
											title="Terakhir" 
											value={todayStats.lastTime}
											subValue={todayStats.lastId}
										/>
									</Col>
								</>
							)}
						</>
					)}
				</Row>

                <Row gutter={[20, 20]}>
                    <Col xs={24} xl={isOwner ? 16 : 24} >
						<Space orientation="vertical" size={16} className="w-full">
							<Card 
								title={<Space><HistoryOutlined /> <span className="text-sm font-bold">Riwayat Transaksi</span></Space>}
								extra={!isCashier && (
									<Space>
										<DatePicker picker="month" size="small" placeholder="Mei 2026" onChange={(_, dateString) => setMonth(dateString)} defaultValue={dayjs(month)}  />
										<Button 
											size="small" 
											icon={<ReloadOutlined />} 
											type="primary" 
											className="!bg-blue-600 border-none" 
											onClick={() => {refresh}}
										>
											Refresh
										</Button>
									</Space>
								)}
								className="shadow-sm border-none rounded-2xl mb-6"
							>
								<Table 
									loading={loading}
									dataSource={transactions}             
									columns={transactionColumns} 
									rowKey="transaction_id"                 
									pagination={isCashier ? false : { pageSize: 5 }}
									scroll={{ x: 600 }}
								/>
							</Card>

							{(isOwner || isAdmin) && (
								<Card 
									title={<Space><PlusCircleOutlined /> <span className="text-sm font-bold">Riwayat Add Stok</span></Space>}
									className="shadow-sm border-none rounded-2xl"
								>
									<Table 
										loading={loading}
										dataSource={stockLogs}                 
										columns={stockLogColumns} 
										rowKey={(record) => `${record.product_name}-${record.branch_name}`}
										pagination={{ pageSize: 5 }}
										size="middle"
									/>
								</Card>
							)}
						</Space>
                        
                    </Col>

                    {(isOwner || isAdmin) && (
                        <Col xs={24} xl={8}>
                            <Space orientation="vertical" size={20} className="w-full">
                                {isOwner && (
									<Card title={<span className="text-sm font-bold">Laporan Laba Rugi</span>} className="shadow-sm border-none rounded-2xl">
										{loading ? <Skeleton active /> : (
											<>
												<div className="grid grid-cols-2 gap-3 mb-4">
													<div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
														<div className="text-[10px] text-gray-400 uppercase font-bold">Omzet</div>
														<div className="font-bold">{formatRupiah(stats.omzet)}</div>   
													</div>
													<div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100">
														<div className="text-[10px] text-indigo-400 uppercase font-bold">Margin</div>
														<div className="font-bold text-indigo-600">{stats.margin}%</div>  
													</div>
												</div>
												<Flex justify="space-between" align="center" className="p-3 bg-green-50 rounded-xl border border-green-100">
													<Text className="text-xs text-green-700 font-bold">Laba Bersih</Text>
													<Text className="text-lg text-green-700 font-bold">{formatRupiah(stats.profit)}</Text> 
												</Flex>
											</>
										)}
									</Card>
								)}
                                
                               	<Card title={<span className="text-sm font-bold text-red-500">Peringatan Stok</span>} className="shadow-sm border-none rounded-2xl">
									{loading ? <Skeleton active /> : (
										lowStock.length > 0 
											? (
												<div className="flex flex-col gap-2">  
													{lowStock.map((item, idx) => (
														<LowStockItem 
															key={idx}
															name={item.product_name}
															stock={`${Math.floor(item.current_stock)} ${item.base_unit}`}
															branch={isOwner && item.branch_name}
														/>
													))}
												</div>
											)
											: <Text type="secondary">Semua stok terpantau aman.</Text>
									)}
								</Card>
                            </Space>
                        </Col>
                    )}
                </Row>
            </div>
        </MainLayout>
    );
}