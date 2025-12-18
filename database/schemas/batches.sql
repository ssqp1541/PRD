-- Batches 테이블 스키마
-- 목적: 원두 배치 정보 저장 (FR4 데이터 검증)

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

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_batches_product_id ON batches(product_id);
CREATE INDEX IF NOT EXISTS idx_batches_partner_id ON batches(partner_id);
CREATE INDEX IF NOT EXISTS idx_batches_batch_number ON batches(batch_number);
CREATE INDEX IF NOT EXISTS idx_batches_status ON batches(status);
CREATE INDEX IF NOT EXISTS idx_batches_approved_by ON batches(approved_by);

-- updated_at 자동 업데이트 트리거
CREATE TRIGGER update_batches_updated_at BEFORE UPDATE ON batches
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

