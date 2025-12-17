-- Migration: 003_create_products_table.sql
-- Description: Create products table
-- Created: 2025-12-15
-- Depends on: 002_create_partners_table.sql

-- Products 테이블 생성
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    image_url VARCHAR(500),
    partner_id INTEGER NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
    is_eco_friendly BOOLEAN NOT NULL DEFAULT false,
    is_female_producer BOOLEAN NOT NULL DEFAULT false,
    is_eco_packaging BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_products_partner_id ON products(partner_id);
CREATE INDEX IF NOT EXISTS idx_products_eco_friendly ON products(is_eco_friendly);
CREATE INDEX IF NOT EXISTS idx_products_female_producer ON products(is_female_producer);
CREATE INDEX IF NOT EXISTS idx_products_eco_packaging ON products(is_eco_packaging);

-- updated_at 자동 업데이트 트리거
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

