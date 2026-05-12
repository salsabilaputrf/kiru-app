# Kiru App 🟣

Sistem Point of Sale (POS) berbasis web untuk manajemen inventaris dan penjualan UMKM multi-cabang. Dibangun dengan pendekatan **Design Thinking** dimulai dari riset kebutuhan pengguna hingga perancangan fitur. Secara teknis, Kiru App mencakup fitur Dynamic Unit of Measure untuk konversi satuan produk secara otomatis, sistem harga jual bertingkat (eceran & grosir), Role-Based Access Control (RBAC) untuk membatasi hak akses tiap role (Owner, Admin, Kasir), serta dashboard konsolidasi laporan laba/rugi seluruh cabang secara real-time, keseluruhannya dibangun di atas stack Node.js dan React JS.

**Live Demo:** http://187.77.114.63/kiru-app/

> ⚠️ **Belum support tampilan mobile.** Aplikasi ini dioptimalkan untuk penggunaan di **desktop/laptop**. Tampilan di perangkat mobile (HP) saat ini belum responsif dan dapat terlihat berantakan. Gunakan browser desktop untuk pengalaman terbaik.

---

## ✨ Fitur Utama

- **Dashboard Real-Time** — Pantau total penjualan, keuntungan, margin laba, riwayat transaksi, riwayat add stok dan stok menipis dalam satu layar
- **Role-Based Access Control (RBAC)** — Tiga level akses: Owner, Admin, dan Kasir
- **Harga Jual Bertingkat** — Harga otomatis menyesuaikan satuan yang dipilih (Pcs, Renceng, Dus, dll)
- **Dynamic Unit of Measure (UoM)** — Konversi satuan besar ke kecil secara otomatis via multiplier
- **Konsolidasi Laporan Laba/Rugi** — Laporan seluruh cabang sekaligus
- **Manajemen Stok Multi-Cabang** — Admin hanya bisa akses stok cabangnya sendiri
- **Peringatan Stok Menipis** — Notifikasi otomatis ketika stok mendekati batas minimum

---

## 🏗️ Arsitektur Proyek

```
kiru-app/
├── server/                # Express JS REST API
│   ├── configs/           # Konfigurasi database & environment
│   ├── controllers/       # Handler request HTTP per modul
│   ├── domains/           # Penghubung service & repository, berisi pengkondisian tipis/throw error untuk pengecekan
│   ├── middleware/        # Auth JWT, RBAC, error handler
│   ├── models/
│   │   ├── entities/      # Definisi entitas/model utama dengan TypeORM
│   │   ├── responses/     # Struktur response API
│   │   └── schemas/       # Schema validasi
│   ├── repositories/      # Query layer ke database dengan TypeORM
│   ├── routes/            # Definisi endpoint API
│   ├── seeders/           # Data awal / dummy data
│   ├── services/          # Business logic
│   └── utils/             # Helper & utility functions
│
└── frontend/              # Vite + React JS
    ├── public/            # Static assets
    └── src/
        ├── assets/        # Gambar, ikon
        ├── components/
        │   └── layouts/   # Layout wrapper
        ├── configs/       # Konfigurasi menu sidebar per role
        ├── hooks/         # Custom React hooks
        ├── pages/         # Halaman per fitur
        └── services/      # Fungsi fetch API per modul
```

---

## 🛠️ Tech Stack

### Backend
| Teknologi | Kegunaan |
|-----------|----------|
| Express JS | Web framework REST API |
| MySQL | Database relasional |
| JWT | Autentikasi & otorisasi token |
| Bcrypt | Hashing password |

### Frontend
| Teknologi | Kegunaan |
|-----------|----------|
| Vite + React JS | Build tool & UI framework |
| Tailwind CSS | Utility-first styling |
| Ant Design | Komponen UI |
| Custom Hooks | Reusable stateful logic |
| Services Layer | Abstraksi fetch API |

### DevOps & Deployment
| Teknologi | Kegunaan |
|-----------|----------|
| PM2 | Process manager Node.js |
| Nginx | Reverse proxy & static file serving |
| GitHub Actions | CI/CD pipeline otomatis |
| VPS Hostinger | Server hosting |

---

## 🚀 Cara Menjalankan Secara Lokal

### Prasyarat
- Node.js >= 18
- MySQL >= 8
- npm atau yarn

### 1. Clone Repository

```bash
git clone https://github.com/salsabilaputrf/kiru-app.git
cd kiru-app
```

### 2. Setup Backend

```bash
cd backend
cp .env.example .env
# Edit .env sesuai konfigurasi lokal
npm install
npm run migrate
npm run seed
npm run dev
```

> 💾 **Database:** Import file `.sql` ke MySQL terlebih dahulu sebelum menjalankan server. Lihat langkah di bawah.
 
### 2a. Import Database
 
```bash 
# Import file .sql
mysql -u root -p kiru_app < server/database.sql
```
 
Setelah database berhasil diimport, jalankan seeder untuk data awal (roles, branches, user default):
 
```bash
cd server
npm run seed:all
```

### 3. Setup Frontend

```bash
cd frontend
cp .env.example .env
# Sesuaikan VITE_API_URL di .env
npm install
npm run dev
```

Frontend berjalan di `http://localhost:5173`, backend di `http://localhost:5000`.

---

## 🔐 Akses Pengujian

| Role | Username | Password | Akses |
|------|----------|----------|-------|
| Owner | owner12345 | SuperAdmin@321 | Semua fitur, semua cabang, laporan konsolidasi |
| Admin | budi.santoso | Admin@1234 | Stok In, Master Produk, hanya cabang terkait |
| Kasir | dewi.rahayu | Kasir@1234 | Menu POS, cetak struk, hanya cabang terkait |

> ⚠️ Ganti password setelah login pertama melalui menu **Profile Info → Ganti Password**

---

## 📁 Dokumentasi Lengkap

| Dokumen | Deskripsi |
|---------|-----------|
| [frontend.md](./client/frontend.md) | Struktur frontend, komponen, hooks, dan services |
| [backend.md](./server/backend.md) | Arsitektur API, endpoint, middleware, dan database |
| [deployment.md](./deployment.md) | Panduan deploy ke VPS dengan PM2, Nginx, dan GitHub Actions |

---

## 👩‍💻 Author

**Salsabila Putri Fathiyah**
[github.com/salsabilaputrf](https://github.com/salsabilaputrf)