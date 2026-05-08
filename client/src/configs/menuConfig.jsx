import { 
    DashboardOutlined, ShopOutlined, DatabaseOutlined, 
    HistoryOutlined, UsergroupAddOutlined, PieChartOutlined,
    InfoCircleOutlined, LogoutOutlined
} from '@ant-design/icons';

export const getSidebarItems = (navigate) => [
    { key: '1', icon: <DashboardOutlined />, label: 'Dashboard', onClick: () => navigate('/kiru-app') },
    { key: '2', icon: <ShopOutlined />, label: 'Point of Sale (POS)', onClick: () => navigate('/pos') },
    { key: '3', icon: <DatabaseOutlined />, label: 'Inventory Stok', onClick: () => navigate('/inventory') },
    { key: '4', icon: <UsergroupAddOutlined />, label: 'User Management', onClick: () => navigate('/users') },
].map(item => ({ ...item, className: '!rounded-2xl !py-6 my-1' }));

export const getAvatarItems = (onProfileClick, onLogoutClick) => [
    { key: 'profile-info', label: 'Profil Info', icon: <InfoCircleOutlined />, onClick: onProfileClick },
    { type: 'divider' },
    { key: 'logout', label: 'Logout', icon: <LogoutOutlined />, danger: true, onClick: onLogoutClick },
];