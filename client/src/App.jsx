import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from 'antd';
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Menghubungkan Token AntD langsung ke CSS Variables di index.css
          colorPrimary: 'var(--color-kiru-primary)',
          colorTextBase: 'var(--color-kiru-text-main)',
          colorBgLayout: 'var(--color-kiru-background)',
          
          // Radius 16px sesuai --radius-kiru: 1rem
          borderRadius: 16, 
          
          // Warna fungsional lainnya
          colorSuccess: 'var(--color-kiru-online)',
          colorWarning: 'var(--color-kiru-offline)',
        },
        components: {
          Button: {
            // Menggunakan warna hover spesifik dari tema Kiru
            colorPrimaryHover: 'var(--color-kiru-primary-hover)',
            controlHeightLG: 48, // Membuat Button size="large" lebih tinggi/proporsional
          },
          Input: {
            controlHeightLG: 48, // Membuat Input size="large" lebih nyaman
          },
          Menu: {
            itemSelectedBg: 'var(--color-kiru-secondary)', // Ungu muda saat dipilih
            itemSelectedColor: 'var(--color-kiru-primary)', // Ungu utama saat dipilih
            itemColor: 'var(--color-kiru-text-main)', // Warna teks default
          }
        }
      }}
    >
      <Router>
        {/* Class antialiased tetap bisa digunakan dari Tailwind */}
        <main className="antialiased">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </Router>
    </ConfigProvider>
  );
}