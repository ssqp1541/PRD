-- Schema: schema.sql
-- Description: Complete database schema (all tables)
-- Created: 2025-12-15
-- Usage: Execute this file to create all tables at once

-- ============================================
-- Helper Function: update_updated_at_column
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================
-- 1. Users Table
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- bcrypt 해시
    name VARCHAR(255),
    role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'partner', 'admin')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 2. Partners Table
-- ============================================
CREATE TABLE IF NOT EXISTS partners (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    business_number VARCHAR(50) UNIQUE,
    platform_fee_rate DECIMAL(5, 4) NOT NULL DEFAULT 0.1000 CHECK (platform_fee_rate >= 0 AND platform_fee_rate <= 1),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_partners_user_id ON partners(user_id);
CREATE INDEX IF NOT EXISTS idx_partners_business_number ON partners(business_number);

CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON partners
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 3. Products Table
-- ============================================
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    image_url VARCHAR(500),
    partner_id INTEGER NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
    is_eco_friendly BOOLEAN NOT NULL DEFAULT false, -- FR2, FR3 필터링
    is_female_producer BOOLEAN NOT NULL DEFAULT false, -- FR3 필터링
    is_eco_packaging BOOLEAN NOT NULL DEFAULT false, -- FR3 필터링
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_partner_id ON products(partner_id);
CREATE INDEX IF NOT EXISTS idx_products_eco_friendly ON products(is_eco_friendly);
CREATE INDEX IF NOT EXISTS idx_products_female_producer ON products(is_female_producer);
CREATE INDEX IF NOT EXISTS idx_products_eco_packaging ON products(is_eco_packaging);

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 4. Tracking Table
-- ============================================
CREATE TABLE IF NOT EXISTS tracking (
    id SERIAL PRIMARY KEY,
    product_id INTEGER UNIQUE NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    producer_revenue_ratio DECIMAL(5, 2) NOT NULL CHECK (producer_revenue_ratio >= 0 AND producer_revenue_ratio <= 100),
    farm_latitude DECIMAL(10, 8) NOT NULL CHECK (farm_latitude >= -90 AND farm_latitude <= 90),
    farm_longitude DECIMAL(11, 8) NOT NULL CHECK (farm_longitude >= -180 AND farm_longitude <= 180),
    farm_address VARCHAR(500),
    origin_country VARCHAR(100) NOT NULL,
    origin_region VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tracking_product_id ON tracking(product_id);
CREATE INDEX IF NOT EXISTS idx_tracking_origin_country ON tracking(origin_country);

CREATE TRIGGER update_tracking_updated_at BEFORE UPDATE ON tracking
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 5. Orders Table
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. Purchases Table
-- ============================================
CREATE TABLE IF NOT EXISTS purchases (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity DECIMAL(10, 3) NOT NULL CHECK (quantity > 0), -- 구매 수량 (kg)
    purchase_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_product_id ON purchases(product_id);
CREATE INDEX IF NOT EXISTS idx_purchases_purchase_date ON purchases(purchase_date);
CREATE INDEX IF NOT EXISTS idx_purchases_user_date ON purchases(user_id, purchase_date);

-- ============================================
-- 7. Batches Table
-- ============================================
CREATE TABLE IF NOT EXISTS batches (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    partner_id INTEGER NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
    batch_number VARCHAR(100) UNIQUE NOT NULL,
    producer_revenue_ratio DECIMAL(5, 2) CHECK (producer_revenue_ratio >= 0 AND producer_revenue_ratio <= 100),
    farm_location_data JSONB, -- 농장 위치 정보
    origin_data JSONB, -- 원산지 정보
    status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'blockchain_recorded')),
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL, -- 승인한 관리자
    blockchain_hash VARCHAR(255), -- 블록체인 해시 (FR4)
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_batches_product_id ON batches(product_id);
CREATE INDEX IF NOT EXISTS idx_batches_partner_id ON batches(partner_id);
CREATE INDEX IF NOT EXISTS idx_batches_batch_number ON batches(batch_number);
CREATE INDEX IF NOT EXISTS idx_batches_status ON batches(status);
CREATE INDEX IF NOT EXISTS idx_batches_approved_by ON batches(approved_by);

CREATE TRIGGER update_batches_updated_at BEFORE UPDATE ON batches
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
