import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider, App as AntdApp } from 'antd';
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserManagement from "./pages/UserManagement";
import InventoryStock from "./pages/InventoryStok";
import PointOfSale from "./pages/PointOfSale";

export default function App() {
	return (
		<AntdApp>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: 'var(--color-kiru-primary)',
						colorTextBase: 'var(--color-kiru-text-main)',
						colorBgLayout: 'var(--color-kiru-background)',					
						borderRadius: 16, 
						colorSuccess: 'var(--color-kiru-online)',
						colorWarning: 'var(--color-kiru-offline)',
					},
					components: {
						Button: {
							colorPrimaryHover: 'var(--color-kiru-primary-hover)',
							controlHeightLG: 48, 
						},
						Input: {
							controlHeightLG: 48, 
						},
						Menu: {
							itemSelectedBg: 'var(--color-kiru-secondary)', 
							itemSelectedColor: 'var(--color-kiru-primary)', 
							itemColor: 'var(--color-kiru-text-main)', 
						}
					}
				}}
			>
				<Router>
					<main className="antialiased">
						<Routes>
							<Route 
							path="/kiru-app" 
							element={
								<ProtectedRoute>
									<Dashboard />
								</ProtectedRoute>							
							} />
							<Route path="/login" element={<Login />} />
							<Route path="/users" element={<UserManagement />} />
							<Route path="/inventory" element={<InventoryStock />} />
							<Route path="/pos" element={<PointOfSale />} />
						</Routes>
					</main>
				</Router>
			</ConfigProvider>
		</AntdApp>
		
	);
}