-- Migration: 002_create_partners_table.sql
-- Description: Create partners table
-- Created: 2025-12-15
-- Depends on: 001_create_users_table.sql

-- Partners 테이블 생성
CREATE TABLE IF NOT EXISTS partners (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    business_number VARCHAR(50) UNIQUE,
    platform_fee_rate DECIMAL(5, 4) NOT NULL DEFAULT 0.1000 CHECK (platform_fee_rate >= 0 AND platform_fee_rate <= 1),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_partners_user_id ON partners(user_id);
CREATE INDEX IF NOT EXISTS idx_partners_business_number ON partners(business_number);

-- updated_at 자동 업데이트 트리거
CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON partners
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

