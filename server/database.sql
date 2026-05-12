-- Create db
CREATE DATABASE IF NOT EXISTS db_kiru;
USE db_kiru;

-- 1. Tabel: ROLES
CREATE TABLE roles (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    role_name VARCHAR(50) NOT NULL UNIQUE,
    rules TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Tabel: BRANCHES
CREATE TABLE branches (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(150) NOT NULL,
    location VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Tabel: CATEGORIES
CREATE TABLE categories (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Tabel: USERS
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(150) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id CHAR(36),
    branch_id CHAR(36) NOT NULL,
    status ENUM('active', 'inactive', 'banned') NOT NULL DEFAULT 'active',
    last_login_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
    CONSTRAINT fk_user_branch FOREIGN KEY (branch_id) REFERENCES branches(id)
);

-- 5. Tabel: PRODUCTS
CREATE TABLE products (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    product_name VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 6. Tabel: PRODUCT_CATEGORY_REL sebagai relasi tabel product dengan categories
CREATE TABLE product_category_rel (
    product_id CHAR(36),
    category_id CHAR(36),
    PRIMARY KEY (product_id, category_id),
    CONSTRAINT fk_rel_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT fk_rel_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- 7. Tabel: PRODUCT_UNITS
CREATE TABLE product_units (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    product_id CHAR(36) NOT NULL,
    unit_name VARCHAR(100) NOT NULL,
    multiplier DECIMAL(10,4) NOT NULL DEFAULT 1.0000,
    is_base_unit BOOLEAN NOT NULL DEFAULT FALSE,
    purchase_price DECIMAL(15,2) NOT NULL DEFAULT 0,
    selling_price DECIMAL(15,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_unit_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 8. Tabel: STOCKS
CREATE TABLE stocks (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    branch_id CHAR(36) NOT NULL,
    product_id CHAR(36) NOT NULL,
    quantity DECIMAL(15,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_stock_branch FOREIGN KEY (branch_id) REFERENCES branches(id),
    CONSTRAINT fk_stock_product FOREIGN KEY (product_id) REFERENCES products(id),
    UNIQUE KEY (branch_id, product_id)
);

-- 9. Tabel: TRANSACTIONS
CREATE TABLE transactions (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    branch_id CHAR(36) NOT NULL,
    transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id CHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_trans_branch FOREIGN KEY (branch_id) REFERENCES branches(id),
    CONSTRAINT fk_trans_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 10. Tabel: TRANSACTION_ITEMS
CREATE TABLE transaction_items (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    transaction_id CHAR(36) NOT NULL,
    product_id CHAR(36) NOT NULL,
    product_unit_id CHAR(36) NOT NULL,
    quantity DECIMAL(15,2) NOT NULL,
    unit_price DECIMAL(15,2) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_item_trans FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
    CONSTRAINT fk_item_product FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT fk_item_unit FOREIGN KEY (product_unit_id) REFERENCES product_units(id)
);

CREATE OR REPLACE VIEW v_dashboard_finance AS
SELECT 
    t.branch_id,
    b.name AS branch_name,
    DATE_FORMAT(t.transaction_date, '%Y-%m') AS transaction_month,
    SUM(ti.quantity * ti.unit_price) AS total_revenue,
    -- Menghitung modal berdasarkan multiplier unit yang terjual
    SUM(ti.quantity * pu.purchase_price) AS total_cost_basis,
    (SUM(ti.quantity * ti.unit_price) - SUM(ti.quantity * pu.purchase_price)) AS gross_profit
FROM transactions t
JOIN transaction_items ti ON t.id = ti.transaction_id
JOIN product_units pu ON ti.product_unit_id = pu.id
JOIN branches b ON t.branch_id = b.id
GROUP BY t.branch_id, transaction_month;

CREATE OR REPLACE VIEW v_dashboard_transactions AS
SELECT 
    t.id AS transaction_id,
    t.transaction_date,
    b.name AS branch_name,
    u.name AS cashier_name,
    (SELECT SUM(quantity * unit_price) FROM transaction_items WHERE transaction_id = t.id) AS total_amount,
    (SELECT SUM(quantity) FROM transaction_items WHERE transaction_id = t.id) AS total_items
FROM transactions t
JOIN users u ON t.user_id = u.id
JOIN branches b ON t.branch_id = b.id;

CREATE OR REPLACE VIEW v_dashboard_low_stock AS
SELECT 
    s.branch_id,
    b.name AS branch_name,
    p.product_name,
    s.quantity AS current_stock,
    pu.unit_name AS base_unit
FROM stocks s
JOIN products p ON s.product_id = p.id
JOIN branches b ON s.branch_id = b.id
JOIN product_units pu ON p.id = pu.product_id AND pu.is_base_unit = TRUE
WHERE s.quantity <= 5; 

CREATE OR REPLACE VIEW v_dashboard_stock_status AS
SELECT 
    p.product_name,
    b.name AS branch_name,
    s.quantity AS stock_qty,
    pu.selling_price,
    s.updated_at AS last_update
FROM stocks s
JOIN products p ON s.product_id = p.id
JOIN branches b ON s.branch_id = b.id
JOIN product_units pu ON p.id = pu.product_id AND pu.is_base_unit = TRUE;