# Deployment Guide

Panduan deploy Kiru App ke VPS Hostinger menggunakan **PM2**, **Nginx**, dan **GitHub Actions** sebagai CI/CD pipeline otomatis.

---

## 🏗️ Arsitektur Deployment

```
GitHub Repository (push to main)
          │
          ▼
GitHub Actions
          │
          ├─ 1. Build client (Vite) di runner
          ├─ 2. Kirim dist/ ke VPS via SCP
          └─ 3. SSH ke VPS → git pull + npm install + pm2 restart
                    │
                    ▼
              VPS Hostinger
              ├── Nginx (port 80)
              │   ├── /kiru-app/   → serve client/dist/ (static files)
              │   └── /api/        → proxy ke server Express (port 5000)
              └── PM2
                  └── kiru-server  → Node.js Express (index.js)
```

---

## ⚙️ Setup Awal VPS

### 1. Install Dependencies

```bash
# Update sistem
sudo apt update && sudo apt upgrade -y

# Install Node.js via NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

# Install PM2
npm install -g pm2

# Install Nginx
sudo apt install nginx -y

# Install MySQL
sudo apt install mysql-server -y
```

### 2. Clone Repository ke VPS

```bash
mkdir -p /var/www/kiru-app
cd /var/www/kiru-app
git clone https://github.com/salsabilaputrf/kiru-app.git .
```

### 3. Setup Environment Server

```bash
cd /var/www/kiru-app/server
cp .env.example .env
nano .env   # Isi DB_HOST, DB_USER, DB_PASS, JWT_SECRET, dll
```

### 4. Setup Database
 
```bash
# Import langsung — CREATE DATABASE sudah ada di dalam file .sql
sudo mysql -u root -p < /var/www/kiru-app/server/database.sql
```

> Kalau ingin pakai user khusus bukan root:
> ```bash
> # Buat user dulu
> sudo mysql -u root -p -e "CREATE USER 'kiru_user'@'localhost' IDENTIFIED BY 'yourpassword'; GRANT ALL PRIVILEGES ON kiru_app.* TO 'kiru_user'@'localhost'; FLUSH PRIVILEGES;"
>
> # Lalu update .env dengan kredensial user tersebut
> ```

---

## 🔧 Konfigurasi Nginx

Buat file konfigurasi di `/etc/nginx/sites-available/default` karena ada app yang lain:

```nginx
server {
    listen 80 default_server;
    server_name _;

    # Client — serve static build files
    location /kiru-app {
        alias /var/www/kiru-app/client/;
        index index.html;
        try_files $uri $uri/ /kiru-app/index.html;
    }

    location /api/ {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
# Aktifkan konfigurasi
sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🟢 Menjalankan Backend dengan PM2

```bash
cd /var/www/kiru-app/server
npm install --production

# Start dengan PM2
pm2 start index.js --name kiru-server

# Simpan agar auto-start setelah reboot
pm2 save
pm2 startup
```

### Perintah PM2 Berguna

```bash
pm2 status                  # Cek status semua proses
pm2 logs kiru-server        # Lihat log real-time
pm2 restart kiru-server     # Restart proses
pm2 reload kiru-server      # Reload tanpa downtime
pm2 stop kiru-server        # Stop proses
```

---

## 🤖 GitHub Actions (CI/CD)

File `.github/workflows/deploy.yml`:

```yaml
name: Deploy Kiru App

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Build frontend
        working-directory: ./client
        env:
          VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
          VITE_STORE_NAME: ${{ secrets.VITE_STORE_NAME }}
        run: |
          echo "VITE_API_BASE_URL=$VITE_API_BASE_URL" > .env.production
          echo "VITE_STORE_NAME=VITE_STORE_NAME" > .env.production
          npm install
          npm run build

      - name: Kirim build frontend ke VPS
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          source: "client/dist/*"
          target: "/var/www/kiru-app/client"
          strip_components: 2

      - name: Update backend & restart PM2
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
            cd /var/www/kiru-app
            git pull origin main
            cd server
            echo "NPM Version: $(npm -v)"
            echo "PM2 Version: $(pm2 -v)"
            npm install --production
            pm2 restart kiru-server || pm2 start index.js --name kiru-server
```

---

## 🔑 Setup GitHub Secrets

Tambahkan secrets berikut di **Settings → Secrets and variables → Actions** pada repository:

| Secret | Isi |
|--------|-----|
| `SSH_HOST` | IP VPS  |
| `SSH_USER` | Username SSH (contoh: `root`) |
| `SSH_KEY` | Private key SSH (isi konten `~/.ssh/id_rsa`) |
| `VITE_API_BASE_URL` | URL API backend  |
| `VITE_STORE_NAME` | Nama toko yang tampil di struk POS |

### Generate SSH Key (jika belum ada)

```bash
# Di komputer lokal
ssh-keygen -t rsa -b 4096 -C "github-actions-kiru"

# Salin public key ke VPS
ssh-copy-id -i ~/.ssh/id_rsa.pub user@ip

# Isi SSH_KEY dengan private key
cat ~/.ssh/id_rsa
```

---

## 🔁 Alur Deploy Otomatis

```
Developer push ke branch main
        │
        ▼
GitHub Actions trigger
        │
        ├── 1. Checkout kode
        ├── 2. Setup Node.js 20
        ├── 3. Build client → inject env dari secrets → npm run build
        ├── 4. SCP: kirim client/dist/ ke VPS via SSH
        └── 5. SSH ke VPS:
                ├── git pull origin main
                ├── cd server → npm install --production
                └── pm2 restart kiru-server
                    (atau pm2 start jika belum jalan)
        │
        ▼
Nginx serve client/dist/ terbaru
Server berjalan via PM2
```

---

## 🛠️ Troubleshooting

**Nginx 502 Bad Gateway**
```bash
# Pastikan server PM2 sedang berjalan
pm2 status
pm2 restart kiru-server
```

**Build client gagal di GitHub Actions**
```bash
# Pastikan secrets VITE_API_BASE_URL & VITE_STORE_NAME sudah diset
# Cek log di tab Actions → pilih workflow yang gagal
```

**Perubahan tidak muncul setelah deploy**
```bash
# Hard reload Nginx
sudo systemctl reload nginx

# Cek apakah dist sudah diperbarui
ls -la /var/www/kiru-app/client/dist/
```