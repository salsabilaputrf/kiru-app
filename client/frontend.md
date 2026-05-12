# Frontend Documentation

Dokumentasi teknis untuk sisi client Kiru App yang dibangun dengan Vite + React JS.

---

## 🗂️ Struktur Folder

```
frontend/
├── public/
│       favicon.svg
│       icons.svg
│
└── src/
    │   App.jsx                         # Root component & router setup
    │   App.css
    │   main.jsx                        # Entry point Vite
    │   index.css
    │
    ├── assets/                         # Gambar, logo
    │       hero.png
    │       kiru_logo_horizontal.svg
    │       kiru_logo_only.svg
    │       logo-kiru.png
    │
    ├── components/
    │   │   Button.jsx                  # Komponen tombol reusable
    │   │   InputField.jsx              # Komponen input reusable
    │   │   Modal.jsx                   # Komponen modal reusable
    │   │   ProtectedRoute.jsx          # Guard route berdasarkan auth & role
    │   │
    │   └── layouts/
    │           AuthLayout.jsx          # Layout halaman login
    │           MainLayout.jsx          # Layout utama (sidebar + navbar)
    │
    ├── configs/
    │       menuConfig.jsx              # Konfigurasi item menu sidebar per role
    │
    ├── hooks/
    │       useAuth.js                  # Manajemen sesi, login, logout
    │       useDashboard.js             # Data & logika halaman dashboard
    │       useFetchRolesAndBranches.js # Fetch dropdown role & cabang
    │       useMainLayout.js            # State sidebar 
    │       useProduct.js               # CRUD produk & satuan
    │       useProfile.js               # Data & update profil user
    │       useTransaction.js           # Data transaksi & proses POS
    │       useUser.js                  # List & manajemen user
    │       useUserForm.js              # State & validasi form tambah/edit user
    │
    ├── pages/
    │       Login.jsx                   # Halaman login
    │       Dashboard.jsx               # Halaman dashboard konsolidasi
    │       InventoryStok.jsx           # Halaman manajemen stok & produk
    │       PointOfSale.jsx             # Halaman kasir / POS
    │       UserManagement.jsx          # Halaman kelola user (owner only)
    │       ProfileInfo.jsx             # Halaman profil & ganti password
    │
    └── services/
            api.js                      # Instance axios + interceptor JWT
            authService.js              # Login, logout, current user
            dashboardService.js         # Fetch data dashboard & laporan
            productService.js           # CRUD produk, satuan, stok
            profileService.js           # Get profil, ganti password
            transactionService.js       # Buat transaksi, riwayat, export
            userService.js              # CRUD user & manajemen akses
```

---

## ⚙️ Setup & Konfigurasi

### Environment Variables

Buat file `.env` di root folder `client/`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_STORE_NAME=Nama Toko Kamu
```

Untuk production (di-inject otomatis via GitHub Actions secrets):


### Install & Jalankan

```bash
npm install
npm run dev       # Development
npm run build     # Build production
```

---

## 🔧 Konfigurasi Axios

File `src/services/api.js` berisi instance axios terpusat dengan interceptor untuk inject token JWT secara otomatis:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

---

## 🪝 Custom Hooks

Hooks digunakan untuk mengabstraksi logika stateful yang reusable di berbagai halaman.

```javascript
// Contoh penggunaan useAuth
const { user, login, logout, isAuthenticated } = useAuth();
```

| Hook | Fungsi |
|------|--------|
| `useAuth` | Manajemen sesi, login, logout |
| `useDashboard` | Data & logika halaman dashboard |
| `useFetchRolesAndBranches` | Fetch dropdown role & cabang untuk form |
| `useMainLayout` | State sidebar |
| `useProduct` | CRUD produk & satuan |
| `useProfile` | Data profil user |
| `useTransaction` | Data transaksi & proses POS |
| `useUser` | List & manajemen user |
| `useUserForm` | State & validasi form tambah/edit user |

---

## 🗃️ Services Layer

Setiap modul memiliki file service tersendiri di `src/services/` yang bertanggung jawab melakukan fetch ke API backend melalui instance axios di `api.js`.


```javascript
// services/productService.js
import api from "./api";

export const profileService = {
    getProfile: () => {
        const data = localStorage.getItem("user_detail");
        try {
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error("Format data profil rusak");
            return null;
        }
    },

    updatePassword: async (oldPassword, newPassword) => {

        const response = await api.put('/users/change-password', { oldPassword, newPassword });
        const success = response.data?.success;
        let message ;

        if (success === false) {
            message = "Password gagal diperbarui"
        }

        return response.data?.message;
    },
    
};
```

| Service | Fungsi |
|---------|--------|
| `api.js` | Instance axios + interceptor JWT otomatis |
| `authService.js` | Login, logout, current user |
| `dashboardService.js` | Fetch data dashboard & laporan laba/rugi |
| `productService.js` | CRUD produk, satuan, stok |
| `profileService.js` | Get profil, ganti password |
| `transactionService.js` | Buat transaksi, riwayat |
| `userService.js` | CRUD user & manajemen akses |

---

## 🎨 UI & Styling

- **Tailwind CSS v4** — utility-first styling
- **Ant Design v6** — komponen kompleks seperti Table, Form, Modal, Select, dan Notification
- **Motion** — animasi deklaratif untuk transisi UI
- Kombinasi: Tailwind untuk layout & spacing, Ant Design untuk komponen interaktif

---

## 📦 Dependencies Utama

| Package | Kegunaan |
|---------|----------|
| `react` `react-dom` | Core UI library (v19) |
| `react-router-dom` | Client-side routing (v7) |
| `axios` | HTTP client untuk fetch API |
| `antd` | Komponen UI (Table, Form, Modal, dll) |
| `tailwindcss` + `@tailwindcss/vite` | Utility-first CSS, integrasi via Vite plugin |
| `motion` | Animasi & transisi UI |
| `dayjs` | Manipulasi & format tanggal |
| `html2canvas` | Generate & download PDF (cetak struk) |
| `dotenv` | Load environment variables |