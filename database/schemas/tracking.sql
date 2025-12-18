-- Tracking 테이블 스키마
-- 목적: 원두 추적 정보 저장 (FR1)

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

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_tracking_product_id ON tracking(product_id);
CREATE INDEX IF NOT EXISTS idx_tracking_origin_country ON tracking(origin_country);

-- updated_at 자동 업데이트 트리거
CREATE TRIGGER update_tracking_updated_at BEFORE UPDATE ON tracking
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

